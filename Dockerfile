FROM golang:latest as builder

ENV CGO_ENABLED=0
ENV GOOS=linux
ENV GOARCH=amd64

WORKDIR /app
COPY ./omserver/go.mod .
COPY ./omserver/go.sum .

RUN go mod download
COPY ./omserver/ .

RUN GOOS=linux GOARCH=amd64 go build -o /main

FROM alpine:latest

COPY --from=builder /main .

ENV PORT=${PORT}
ENTRYPOINT ["/main"]