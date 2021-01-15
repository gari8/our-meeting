package repository

import (
	"omserver/graph/model"
)

func (r *repository)FetchMessagesByRoomID(roomId string) ([]*model.Message, error) {
	var messages []*model.Message
	rows, err := r.DB.Query("SELECT id, room_id, text FROM messages WHERE room_id = $1;", roomId)
	if rows == nil {
		return nil, err
	}
	for rows.Next() {
		message := &model.Message{}
		err = rows.Scan(&message.ID, &message.RoomID, &message.Text)
		if err == nil {
			messages = append(messages, message)
		}
	}
	return messages, nil
}

func (r *repository)InsertMessage(roomId string, text string) (int, error) {
	stmt := `INSERT INTO messages(room_id, text) VALUES($1, $2) RETURNING id`
	id := 0
	err := r.DB.QueryRow(stmt, roomId, text).Scan(&id)
	if err != nil {
		return 0, err
	}
	return id, err
}