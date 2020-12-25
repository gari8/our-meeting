package main

import (
	"fmt"
	"net/http"
	"omserver/controllers"
	"omserver/models"

	"omserver/database/postgres/conf"

	"omserver/router"
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

	_ = http.ListenAndServe(":8080", s.Route)
}
