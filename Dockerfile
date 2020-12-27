FROM golang:latest as builder

ENV CGO_ENABLED=0
ENV GOOS=linux
ENV GOARCH=amd64
WORKDIR /app
COPY ./omserver/ .
RUN go build -o main

# 作ったGoのバイナリを実行する
FROM alpine:latest
COPY --from=builder /app /app

CMD /app/main $PORT