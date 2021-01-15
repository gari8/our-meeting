package repository

import (
	"database/sql"
	"omserver/graph/model"
)

func NewRepository(conn *sql.DB) Repository {
	return &repository{DB: conn}
}

type Repository interface {
	FetchRooms() ([]*model.Room, error)
	FetchMessagesByRoomID(roomId string) ([]*model.Message, error)
	InsertRoom(ulId string, roomName string, description string, disabled bool) (string, error)
	InsertMessage(roomId string, text string) (int, error)
}

type repository struct {
	DB *sql.DB
}