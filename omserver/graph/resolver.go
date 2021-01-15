package graph

import (
	"context"
	"encoding/json"
	"github.com/go-redis/redis"
	"github.com/oklog/ulid"
	"log"
	"math/rand"
	"omserver/graph/generated"
	"omserver/graph/model"
	"omserver/repository"
	"sync"
	"time"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct{
	Repository repository.Repository
	redisClient     *redis.Client
	messageChannels map[string]chan *model.Message
	mutex           sync.Mutex
}

func NewGraphQLConfig(redisClient *redis.Client, repository repository.Repository) *Resolver {
	resolver := newResolver(redisClient, repository)

	resolver.startSubscribingRedis()

	return resolver
}

func newResolver(redisClient *redis.Client, repository repository.Repository) *Resolver {
	return &Resolver{
		Repository: repository,
		redisClient:     redisClient,
		messageChannels: map[string]chan *model.Message{},
		mutex:           sync.Mutex{},
	}
}

func (r *mutationResolver) CreateRoom(_ context.Context, roomName string, description *string) (*model.Room, error) {
	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	id := ulid.MustNew(ulid.Timestamp(t), entropy)
	room := model.Room{}

	room.Ulid = id.String()
	room.RoomName = roomName
	room.Description = description
	room.Disabled = false
	rD := ""
	if room.Description != nil {
		rD = *room.Description
	}
	_, err := r.Repository.InsertRoom(room.Ulid, room.RoomName, rD, room.Disabled)

	if err != nil {
		log.Println(err)
		return nil, err
	}

	return &room, nil
}

func (r *mutationResolver) PostMessage(_ context.Context, roomID string, text string) (*model.Message, error) {
	m := model.Message{
		Text: text,
		RoomID: roomID,
	}

	// INSERT data
	id, err := r.Repository.InsertMessage(roomID, text)
	if err != nil {
		return nil, err
	}

	m.ID = id

	mb, err := json.Marshal(m)

	if err != nil {
		log.Println(err)
		return nil, err
	}

	r.redisClient.Publish("room", mb)

	return &m, nil
}

func (r *queryResolver) Rooms(ctx context.Context) ([]*model.Room, error) {
	rooms, err := r.Repository.FetchRooms()
	if err != nil {
		return nil, err
	}
	return rooms, nil
}

func (r *queryResolver) Messages(_ context.Context, roomID string) ([]*model.Message, error) {
	messages, err := r.Repository.FetchMessagesByRoomID(roomID)
	if err != nil {
		return nil, err
	}
	return messages, nil
}

func (r *subscriptionResolver) MessagePosted(ctx context.Context, roomID string) (<-chan *model.Message, error) {
	messageChan := make(chan *model.Message, 1)
	r.mutex.Lock()
	r.messageChannels[roomID] = messageChan
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		r.mutex.Unlock()
	}()

	return messageChan, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// Subscription returns generated.SubscriptionResolver implementation.
func (r *Resolver) Subscription() generated.SubscriptionResolver { return &subscriptionResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type subscriptionResolver struct{ *Resolver }


func (r *Resolver) startSubscribingRedis() {
	log.Println("Start Subscribing Redis...")

	go func() {
		pubsub := r.redisClient.Subscribe("room")
		defer pubsub.Close()

		for {
			msgi, err := pubsub.Receive()
			if err != nil {
				panic(err)
			}

			switch msg := msgi.(type) {
			case *redis.Message:

				// Convert recieved string to Message.
				m := model.Message{}
				if err := json.Unmarshal([]byte(msg.Payload), &m); err != nil {
					log.Println(err)
					continue
				}

				// Notify new message.
				r.mutex.Lock()
				for _, ch := range r.messageChannels {
					ch <- &m
				}
				r.mutex.Unlock()

			default:
			}
		}
	}()
}
