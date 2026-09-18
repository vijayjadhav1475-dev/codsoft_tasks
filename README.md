# Task 2 - Contact Management System

## Technologies Used
- Node.js
- Express.js
- MySQL
- Postman

## Features
- Add new contact
- Retrieve all contacts
- Retrieve contact by ID
- Update contact
- Delete contact
- Search contacts by name, email or phone
- Sort contacts
- Pagination
- Input validation
- Duplicate email/phone prevention
- Proper HTTP status codes

## API Base URL

http://localhost:5001/api/contacts

## API Endpoints

### 1. Get All Contacts
GET
/api/contacts

### 2. Get Contact by ID
GET
/api/contacts/:id

Example:
GET http://localhost:5001/api/contacts/1

### 3. Add Contact
POST
/api/contacts

Example JSON:
{
  "name": "Vijay",
  "email": "vijay@gmail.com",
  "phone": "9876543210"
}

### 4. Update Contact
PUT
/api/contacts/:id

Example:
{
  "name": "Vijay Jadhav",
  "email": "vijay@gmail.com",
  "phone": "9876543210"
}

### 5. Delete Contact
DELETE
/api/contacts/:id

### 6. Search Contacts

GET
/api/contacts?search=Vijay

### 7. Sorting

GET
/api/contacts?sortBy=name&order=ASC

### 8. Pagination

GET
/api/contacts?page=1&limit=10

## HTTP Status Codes

200 - Success
201 - Contact created successfully
400 - Invalid request / validation error
404 - Contact not found
409 - Duplicate email or phone
500 - Server error

## Project Structure

contact-management/
│
├── config/
├── controllers/
├── routes/
├── node_modules/
├── .env
├── server.js
├── package.json
└── README.md

## Database

Database: codsoft_contacts

Table: contacts

## API Testing

All APIs were tested using Postman.

## CodSoft Internship

Task 2 - Contact Management System
Backend Development Internship
