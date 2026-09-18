# Task 1 - Student Record Management API

## Technologies Used

- Node.js
- Express.js
- MySQL
- Postman

## Features

- Add new student
- Retrieve all students
- Retrieve student by ID
- Update student
- Delete student
- Search students
- Filter students
- Sort students
- Pagination
- Input validation
- Proper HTTP status codes
- MySQL database integration

## API Base URL

http://localhost:5000/api/students

## API Endpoints

### 1. Get All Students

GET

/api/students

Example:

GET http://localhost:5000/api/students


### 2. Get Student by ID

GET

/api/students/:id

Example:

GET http://localhost:5000/api/students/1


### 3. Add New Student

POST

/api/students

Body → raw → JSON

Example:

{
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "age": 22
}


### 4. Update Student

PUT

/api/students/:id

Example:

PUT http://localhost:5000/api/students/1

Body → raw → JSON

{
  "name": "Rahul Patil",
  "email": "rahul@gmail.com",
  "age": 23
}


### 5. Delete Student

DELETE

/api/students/:id

Example:

DELETE http://localhost:5000/api/students/1


### 6. Search Students

GET

/api/students?search=Rahul

Example:

GET http://localhost:5000/api/students?search=Rahul


### 7. Filter Students

GET

/api/students?age=22


### 8. Sorting

GET

/api/students?sortBy=name&order=ASC


### 9. Pagination

GET

/api/students?page=1&limit=10

## HTTP Status Codes

200 - Success
201 - Student created successfully
400 - Invalid request / validation error
404 - Student not found
500 - Server error

## Database

Database: codsoft_task1

Tables:

- students
- courses
- enrollments

## Project Structure

student-record-api/
│
├── config/
├── controllers/
├── routes/
├── node_modules/
├── .env
├── server.js
├── student_database.sql
├── package.json
└── README.md

## API Testing

All APIs were tested using Postman.

## CodSoft Internship

Task 1 - Student Record Management API

Backend Development Internship
