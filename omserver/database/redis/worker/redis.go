package worker

import (
	"github.com/go-redis/redis"
)

func NewRedisClient(opt *redis.Options) (*redis.Client, error) {
	client := redis.NewClient(opt)

	_, err := client.Ping().Result()

	return client, err
}
