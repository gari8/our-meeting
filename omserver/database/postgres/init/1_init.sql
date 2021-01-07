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
INSERT INTO messages VALUES (1, 'askflsrxjfias', 'no.1 room no.1');
INSERT INTO messages VALUES (2, 'askflsrxjfias', 'no.2 room no.1');
INSERT INTO messages VALUES (3, 'askflsrxjfias', 'no.3 room no.1');
INSERT INTO messages VALUES (4, 'bserflsrjfias', 'no.4 room no.2');
INSERT INTO messages VALUES (5, 'bserflsrjfias', 'no.5room no.2');
INSERT INTO messages VALUES (6, 'askcccccccias', 'no.6room no.3');

