package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"omserver/graph/generated"
	"omserver/graph/model"
)

func (r *mutationResolver) CreateRoom(ctx context.Context, roomName string, description *string) (*model.Room, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) PostMessage(ctx context.Context, roomID string, text string) (*model.Message, error) {
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

func (r *queryResolver) Messages(ctx context.Context, roomID string) ([]*model.Message, error) {
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
