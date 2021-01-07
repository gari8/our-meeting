package repository

import "omserver/graph/model"

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