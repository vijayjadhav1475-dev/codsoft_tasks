# Task 3 - To-Do List Backend

A RESTful To-Do List Backend API built using Node.js, Express.js, and MySQL.

## Technologies Used

* Node.js
* Express.js
* MySQL
* mysql2
* CORS
* dotenv

## Task 3 Features

* Create new tasks
* Retrieve all tasks
* Retrieve a task by ID
* Update tasks
* Delete tasks
* Mark tasks as completed or pending
* Search tasks
* Filter tasks by completion status
* Sort tasks
* Pagination
* Request data validation
* Due dates
* Priority levels
* Task categories
* Appropriate HTTP status codes
* MySQL database storage
* Controller and route based project structure

## API Base URL

```text
http://localhost:5002/api/tasks
```

## API Endpoints

### 1. Get All Tasks

**GET**

```text
/api/tasks
```

Example:

```text
GET http://localhost:5002/api/tasks
```

Supports search, filtering, sorting, and pagination.

### 2. Get Task by ID

**GET**

```text
/api/tasks/:id
```

Example:

```text
GET http://localhost:5002/api/tasks/1
```

### 3. Create New Task

**POST**

```text
/api/tasks
```

Example request body:

```json
{
  "title": "Learn Node.js",
  "description": "Complete backend and API practice",
  "status": "pending",
  "due_date": "2026-09-19",
  "priority": "high",
  "category": "Learning"
}
```

### 4. Update Task

**PUT**

```text
/api/tasks/:id
```

Example:

```text
PUT http://localhost:5002/api/tasks/1
```

Example request body:

```json
{
  "title": "Learn Node.js Advanced",
  "description": "Complete backend and API practice",
  "status": "completed",
  "due_date": "2026-09-19",
  "priority": "high",
  "category": "Learning"
}
```

### 5. Delete Task

**DELETE**

```text
/api/tasks/:id
```

Example:

```text
DELETE http://localhost:5002/api/tasks/1
```

### 6. Update Task Status

**PATCH**

```text
/api/tasks/:id/status
```

Example:

```text
PATCH http://localhost:5002/api/tasks/1/status
```

Request body:

```json
{
  "status": "completed"
}
```

Allowed status values:

```text
pending
completed
```

## Search and Filter

### Search Tasks

```text
GET /api/tasks?search=Node
```

Searches task title, description, and category.

### Filter by Status

Completed tasks:

```text
GET /api/tasks?status=completed
```

Pending tasks:

```text
GET /api/tasks?status=pending
```

## Sorting

Tasks can be sorted using:

```text
sortBy
```

Allowed sort fields:

```text
id
title
status
priority
due_date
created_at
```

Example:

```text
GET /api/tasks?sortBy=priority&order=ASC
```

Allowed order values:

```text
ASC
DESC
```

## Pagination

Example:

```text
GET /api/tasks?page=1&limit=10
```

* `page` = page number
* `limit` = number of tasks per page

## HTTP Status Codes

| Status Code | Meaning                   |
| ----------- | ------------------------- |
| 200         | Request successful        |
| 201         | Task created successfully |
| 400         | Invalid request data      |
| 404         | Task not found            |
| 500         | Server/database error     |

## Database

Database name:

```text
codsoft_todo
```

Main table:

```text
tasks
```

The `tasks` table stores:

* id
* title
* description
* status
* due_date
* priority
* category
* created_at

## Project Structure

```text
CODSOFT Task 3 To-Do Backend
│
├── config
│   └── db.js
│
├── controllers
│   └── taskController.js
│
├── routes
│   └── taskRoute.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## How to Run

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node server.js
```

Server:

```text
http://localhost:5002
```

API:

```text
http://localhost:5002/api/tasks
```

## API Testing

The APIs can be tested using Postman.

## Internship Task

**CodSoft Backend Development Internship**

**Task 3: To-Do List Backend**
