CREATE SCHEMA IF NOT EXISTS test;

create table test.students (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(40) NOT NULL,
    ra SERIAL UNIQUE NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);