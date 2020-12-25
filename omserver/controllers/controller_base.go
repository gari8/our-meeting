package controllers

import "omserver/models"

type Controller struct {
	SampleController
}

func NewController(model *models.Model) *Controller {
	c := &Controller{}
	c.SampleController = NewSampleController(model)
	return c
}
