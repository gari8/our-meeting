package conf

import (
	"database/sql"
	_ "github.com/lib/pq"
	"os"
)

var (
	DRIVER   = os.Getenv("DRIVER")
	source = os.Getenv("DATABASE_URL")
)

func NewDatabaseConnection() (*sql.DB, error) {
	conn, err := sql.Open(DRIVER, source)
	if err != nil {
		return nil, err
	}
	return conn, nil
}
