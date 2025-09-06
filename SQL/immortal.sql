DROP DATABASE IF EXISTS immortal_db;
CREATE DATABASE immortal_db;

DROP TABLE IF EXISTS forum;
DROP TABLE IF EXISTS topic;
DROP TABLE IF EXISTS dude_reputation;
DROP TABLE IF EXISTS dude;

CREATE TABLE dude(
    id int PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    external_id VARCHAR(255)
);

CREATE TABLE dude_reputation(
    id int PRIMARY KEY,
    dude_id int,
    reputation_points int DEFAULT 0,
    FOREIGN KEY (dude_id) REFERENCES dude(id)
);

CREATE TABLE topic(
    id int PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(1000) 
);

CREATE TABLE forum(
    id int PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    dude_id int,
    topic_id int,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dude_id) REFERENCES dude(id),
    FOREIGN KEY (topic_id) REFERENCES topic(id)
);
