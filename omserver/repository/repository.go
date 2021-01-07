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
}

type repository struct {
	DB *sql.DB
}