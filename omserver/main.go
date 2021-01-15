package main

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	"github.com/gorilla/websocket"
	"github.com/rs/cors"
	"log"
	"net/http"
	"omserver/database/postgres/conf"
	"omserver/database/redis/worker"
	"omserver/graph"
	"omserver/graph/generated"
	"omserver/repository"
	"os"
)

const defaultPort = "8080"

func main() {
	router := chi.NewRouter()

	router.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "PUT", "HEAD", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		Debug:            true,
	}).Handler)

	redisUrl := os.Getenv("REDIS_URL")

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
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

	resolvers := graph.NewGraphQLConfig(redisClient, newRepository)

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: resolvers}))

	srv.AddTransport(&transport.Websocket{
		Upgrader: websocket.Upgrader{
			//CheckOrigin: func(r *http.Request) bool {
			//	// Check against your desired domains here
			//	return r.Host == "*"
			//},
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
		},
	})


	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
