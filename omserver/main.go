package main

import (
	"log"
	"net/http"
	"omserver/database/postgres/conf"
	"omserver/database/redis/worker"
	"omserver/graph"
	"omserver/repository"
	"omserver/server"
	"os"
)

const defaultPort = "8080"

func main() {

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}
	redisUrl := os.Getenv("REDIS_URL")
	if redisUrl == "" {
		log.Fatal("REDIS_URL is not defined")
	}

	conn, err := conf.NewDatabaseConnection()
	if err != nil {
		panic(err)
	}
	if conn == nil {
		panic(err)
	}
	defer func() {
		if conn != nil {
			if err := conn.Close(); err != nil {
				panic(err)
			}
		}
	}()

	newRepository := repository.NewRepository(conn)

	redisClient, err := worker.NewRedisClient(redisUrl)
	if err != nil {
		panic(err)
	}
	//defer func() {
	//	if redisClient != nil {
	//		if err := redisClient.Close(); err != nil {
	//			panic(err)
	//		}
	//	}
	//}()

	resolvers := graph.NewGraphQLConfig(redisClient, newRepository)

	s := server.NewGraphQLServer(resolvers)

	router, err := s.Serve()
	if err != nil {
		panic(err)
	}

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
