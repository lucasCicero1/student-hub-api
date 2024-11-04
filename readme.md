# Student Hub Api

This is a REST API built to manipulate students from an educational institution, the Student Hub Api. The entire API is written in NodeJs and it is possible to **Register**, **Search**, **Update** and **Delete** students.

#

## Getting Started

### Requirements:
>node: 20.x.x

`cp .env.example .env` - Copy ".env.example" to ".env"

### Run the app with Docker

- git clone https://github.com/lucasCicero1/student-hub-api.git

- `docker compose up --build` - This will create a container with the application running on port 3000 and the database.

- `docker compose down` - This will stop the application and database.

### Run the Tests

- `npm test` - This will run the application unit tests.

## Features

- \[x] Register Student
- \[x] Search Students
- \[x] Update Student
- \[x] Delete Student
- \[x] Unit Tests
- \[ ] Integration Tests
- \[ ] Security - Authorization Middleware

## REST Services

POST - `/v1/create/student`

- Should create a new Student.

### Required Parameters:

- `"name"` - Student Name,
- `"email"` - Student Email, 
- `"cpf"` - Student CPF

### Exceptions:

- 400 - `InvalidParamError`
- 400 - `MissingParamError`
- 409 - `UserExistsError`
- 500 - `ServerError`

#

GET - `/v1/list/students`

- Should return an array of students.

### Exceptions:

- 500 - `ServerError`

#

PATCH - `/v1/update/student`

- Should update an existing student.

### Required Parameters:

- `"name"` - Student Name,
- `"email"` - Student Email, 
- `"cpf"` - Student CPF

### Exceptions:

- 400 - `InvalidParamError`
- 400 - `MissingParamError`
- 500 - `ServerError`

#

DELETE - `/v1/delete/student`

- Should delete an existing student.

### Required Parameters:

- `"cpf"` - Student CPF

### Exceptions:

- 400 - `MissingParamError`
- 500 - `ServerError`
