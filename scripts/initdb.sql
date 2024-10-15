SET TIME ZONE 'America/Sao_Paulo';

CREATE SCHEMA IF NOT EXISTS test;

create table test.students (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(40) NOT NULL,
    ra SERIAL UNIQUE NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE SCHEMA IF NOT EXISTS development;

create table development.students (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(40) NOT NULL,
    ra SERIAL UNIQUE NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO development.students (name, email, cpf) VALUES ('joão', 'joao@mail.com', '12345678945'), ('maria', 'maria@mail.com', '56345678342')