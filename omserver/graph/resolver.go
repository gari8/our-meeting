package graph

import (
	"encoding/json"
	"github.com/go-redis/redis"
	"log"
	"omserver/graph/model"
	"omserver/repository"
	"sync"
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
