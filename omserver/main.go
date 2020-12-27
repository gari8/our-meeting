package main

import (
	"fmt"
	"net/http"
	"omserver/controllers"
	"omserver/models"
	"os"

	"omserver/database/postgres/conf"

	"omserver/http/router"
)

func main() {
	conn, err := conf.NewDatabaseConnection()
	if err != nil {
		panic(err)
	}
	defer conn.Close()
	fmt.Println(`
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
  *        ####    #####    #####     ####    ##  ##   ######   ######   #####  *
  *      ##  ##   ##  ##   ##  ##     ##     ### ##     ##     ##       ##  ##  *
  *     ##       ##  ##   ##  ##     ##     ######     ##     ##       ##  ##   *
  *     ####    #####    #####      ##     ######     ##     ####     #####     *
  *       ##   ##       ####       ##     ## ###     ##     ##       ####       *
  *  ##  ##   ##       ## ##      ##     ##  ##     ##     ##       ## ##       *
  *  ####    ##       ##  ##    ####    ##  ##     ##     ######   ##  ##       *
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    `)

	fmt.Println(`HTML:	GET http://localhost:8080`)
	fmt.Println(`API:	GET http://localhost:8080/api/v1`)

	m := models.NewModel(conn)
	c := controllers.NewController(m)
	s := router.NewRouter()
	s.Router(c)

	port := os.Getenv("PORT")

	_ = http.ListenAndServe(":"+ port, s.Route)
}
