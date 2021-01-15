DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS messages;

CREATE TABLE IF NOT EXISTS rooms
(
    ulid TEXT NOT NULL,
    room_name TEXT NOT NULL,
    description TEXT NULL,
    disabled BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (ulid)
);

CREATE TABLE IF NOT EXISTS messages
(
    id SERIAL NOT NULL,
    room_id TEXT NOT NULL,
    text TEXT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO rooms VALUES ('askflsrxjfias', 'r1', 'no.1', false);
INSERT INTO rooms VALUES ('bserflsrjfias', 'r2', 'no.2', false);
INSERT INTO rooms VALUES ('askcccccccias', 'r3', 'no.3', false);

