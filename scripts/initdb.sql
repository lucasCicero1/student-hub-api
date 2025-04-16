SET TIME ZONE 'America/Sao_Paulo';

CREATE SCHEMA IF NOT EXISTS my_schema;

create table if not exists my_schema.students (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(40) NOT NULL,
    ra SERIAL UNIQUE NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_modified_time BEFORE UPDATE ON my_schema.students FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

INSERT INTO my_schema.students (name, email, cpf) VALUES ('Henrique Santos', 'henrique.123@mail.com', '91381231412'), ('Joyce Oliveira', 'joyce.oliveira@yahoo.com.br', '85712945123'), ('Luana Silva', 'luana@hotmail.com', '85712311234')

-- CREATE SCHEMA IF NOT EXISTS test;

-- create table if not exists test.students (
--     id SERIAL PRIMARY KEY NOT NULL,
--     name VARCHAR(50) NOT NULL,
--     email VARCHAR(40) NOT NULL,
--     ra SERIAL UNIQUE NOT NULL,
--     cpf VARCHAR(11) UNIQUE NOT NULL,
--     created_at TIMESTAMPTZ DEFAULT NOW(),
--     updated_at TIMESTAMPTZ DEFAULT NOW()
-- );

-- CREATE SCHEMA IF NOT EXISTS development;

-- create table if not exists development.students (
--     id SERIAL PRIMARY KEY NOT NULL,
--     name VARCHAR(50) NOT NULL,
--     email VARCHAR(40) NOT NULL,
--     ra SERIAL UNIQUE NOT NULL,
--     cpf VARCHAR(11) UNIQUE NOT NULL,
--     created_at TIMESTAMPTZ DEFAULT NOW(),
--     updated_at TIMESTAMPTZ DEFAULT NOW()
-- );

-- INSERT INTO development.students (name, email, cpf) VALUES ('joão', 'joao@mail.com', '12345678945'), ('maria', 'maria@mail.com', '56345678342')

CREATE SCHEMA IF NOT EXISTS my_schema;

create table if not exists my_schema.students (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(40) NOT NULL,
    ra SERIAL UNIQUE NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    status VARCHAR(15) NOT NULL,
    avatar CHARACTER VARYING(64) varying(64),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO my_schema.students
    (id, name, email, ra, cpf, status, avatar)
VALUES
(1, 'Izabella Walker', 'izabela.walker@outlook.com', 1, '91381231412', 'active', 'https://i.pravatar.cc/150?u=a042581f4e29026704d'),
(2, 'Rayan Burnett', 'rayan.b@yahoo.com.br', 2, '85712945123', 'paused', 'https://i.pravatar.cc/150?u=a042581f4e29026024d'),
(3, 'Tony Bernal', 'tony-bernal@hotmail.com', 3, '85712311234', 'vacation', 'https://i.pravatar.cc/150?u=a048581f4e29026701d'),
(4, 'Chanel Cherry', 'chanel-cherry@gmail.com', 4, '85746375643', 'active', 'https://i.pravatar.cc/150?u=a092581d4ef9026700d'),
(5, 'Alberto Gilmore', 'alberto-g@gmail.com', 5, '94756218742', 'vacation', 'https://i.pravatar.cc/150?u=a042581f4e29026024d'),
(6, 'Natasha Arellano', 'natasha.arellano@outlook.com', 6, '97537590123', 'active', 'https://i.pravatar.cc/150?u=a04258114e29026702d'),
(7, 'Elina Lowe', 'elina.lowe@hotmail.com', 7, '86495899124', 'paused', 'https://i.pravatar.cc/150?u=a042581f4e29026704d')