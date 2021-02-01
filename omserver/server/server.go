package server

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	"github.com/gorilla/websocket"
	"github.com/rs/cors"
	"net/http"
	"omserver/graph"
	"omserver/graph/generated"
	"os"
)

const localWeb = "http://localhost:3000"

func (g *graphQLServer)Serve() (chi.Router, error){
	router := chi.NewRouter()

	acceptWeb := os.Getenv("ACCEPT_BY_WEB")
	if acceptWeb == "" {
		acceptWeb = localWeb
	}

	router.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{acceptWeb},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "PUT", "HEAD", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		Debug:            true,
	}).Handler)

	srv := handler.New(generated.NewExecutableSchema(generated.Config{Resolvers: g.Resolver}))

	srv.AddTransport(&transport.Websocket{
		Upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
		},
	})

	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.MultipartForm{})


	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	return router, nil
}

type graphQLServer struct {
	Resolver *graph.Resolver
}

type GraphQLServer interface {
	Serve() (chi.Router, error)
}

func NewGraphQLServer(resolver *graph.Resolver) GraphQLServer {
	return &graphQLServer{
		Resolver: resolver,
	}
}
