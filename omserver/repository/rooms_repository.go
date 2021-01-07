package repository

import "omserver/graph/model"

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

