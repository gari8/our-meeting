package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"omserver/graph/generated"
	"omserver/graph/model"
)

func (r *queryResolver) Rooms(ctx context.Context) ([]*model.Room, error) {
	rooms, err := r.Repository.FetchRooms()
	if err != nil {
		return nil, err
	}
	return rooms, nil
}

func (r *queryResolver) Messages(ctx context.Context, roomID string) ([]*model.Message, error) {
	messages, err := r.Repository.FetchMessagesByRoomID(roomID)
	if err != nil {
		return nil, err
	}
	return messages, nil
}

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
