package repository

import (
	"omserver/graph/model"
)

func (r *repository)FetchRooms() ([]*model.Room, error) {
	var rooms []*model.Room
	rows, err := r.DB.Query("SELECT ulid, room_name, description, disabled FROM rooms;")
	if rows == nil {
		return nil, err
	}
	for rows.Next() {
		room := &model.Room{}
		err = rows.Scan(&room.Ulid, &room.RoomName, &room.Description, &room.Disabled)
		room.OwnMessages, err = r.FetchMessagesByRoomID(room.Ulid)
		if err == nil {
			rooms = append(rooms, room)
		}
	}
	return rooms, nil
}

func (r *repository)InsertRoom(ulId string, roomName string, description string, disabled bool) (string, error) {
	stmt := `INSERT INTO rooms(ulid, room_name, description, disabled) VALUES($1, $2, $3, $4) RETURNING ulid`
	id := ""
	err := r.DB.QueryRow(stmt, ulId, roomName, description, disabled).Scan(&id)
	if err != nil {
		return "", err
	}
	return id, err
}

