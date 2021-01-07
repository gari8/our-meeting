package main

import (
	"log"
	"net/http"
	"omserver/database/postgres/conf"
	"omserver/graph"
	"omserver/graph/generated"
	"omserver/repository"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
)

const defaultPort = "8080"

func main() {
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

	repository := repository.NewRepository(conn)

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{Repository: repository}}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
