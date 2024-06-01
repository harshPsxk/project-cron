# Project Cron

This is a Node.js application that provides a RESTful API to manage users with a MySQL database. It includes a cron job that performs a daily maintenance task to delete users created more than a year ago.

## Table of Contents

- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Cron Job](#cron-job)
- [Testing](#testing)
- [License](#license)

## Setup

### Prerequisites

- Docker Desktop
- Node.js and npm installed

### Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/harshPsxk/project-cron.git
   cd project-cron
   npm install
   
Environment Variables

Create a .env file in the root directory of your project and fill in your values:
```
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=yourpassword
  DB_NAME=user_management
  DB_PORT=3306
```  
Replace yourpassword with a secure password of your choice.

Add .env to .gitignore to prevent it from being committed to the repository:

Create or open the .gitignore file and add the following line:

```
# Environment variables
.env
```
Running the Application
Setting Up MySQL with Docker
Run the MySQL Docker container:



docker run --name mysql-db -e MYSQL_ROOT_PASSWORD=yourpassword -e MYSQL_DATABASE=user_management -p 3306:3306 -d mysql:latest
Replace yourpassword with the same password you used in the .env file.

Access the MySQL container to set up the database schema and seed data:



winpty docker exec -it mysql-db mysql -u root -p
Enter the password you set in the previous step when prompted.

Run the following SQL commands to create the users table and seed initial data:



USE user_management;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com'), ('Jane Smith', 'jane@example.com');
Start the application:



npm start
You should see output indicating that the server has started, such as:



Server started on port 3000
API Endpoints
GET /api/users: Fetches a list of all users.
GET /api/users/:id: Fetches a single user by ID.
POST /api/users: Creates a new user.
Request Body: { "name": "John Doe", "email": "john@example.com" }
PUT /api/users/:id: Updates a user by ID.
Request Body: { "name": "John Doe", "email": "john@example.com" }
DELETE /api/users/:id: Deletes a user by ID.
Cron Job
A cron job runs daily at midnight to perform maintenance tasks, such as deleting users created more than a year ago. The cron job logs its activity to the console.

Testing the Cron Job
To test the cron job, you can temporarily modify the schedule in scripts/cronJob.js to run every minute and observe the logs:



const cron = require('node-cron');
const db = require('../config/db');

// Schedule a task to run every minute for testing
cron.schedule('* * * * *', () => {
    console.log('Running maintenance task...');
    const sql = 'DELETE FROM users WHERE DATE(created_at) < DATE_SUB(NOW(), INTERVAL 1 YEAR)';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error running maintenance task:', err);
        } else {
            console.log('Maintenance task completed:', result);
        }
    });
});

module.exports = cron;
Revert the schedule back to run daily at midnight after testing:



const cron = require('node-cron');
const db = require('../config/db');

// Schedule a task to run daily at midnight
cron.schedule('0 0 * * *', () => {
    console.log('Running daily maintenance task...');
    const sql = 'DELETE FROM users WHERE DATE(created_at) < DATE_SUB(NOW(), INTERVAL 1 YEAR)';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error running maintenance task:', err);
        } else {
            console.log('Maintenance task completed:', result);
        }
    });
});

module.exports = cron;
Testing
You can use Postman or curl to test the API endpoints:

Fetch all users:



curl -X GET http://localhost:3000/api/users
Fetch a user by ID:



curl -X GET http://localhost:3000/api/users/1
Create a new user:



curl -X POST -H "Content-Type: application/json" -d '{"name": "Alice", "email": "alice@example.com"}' http://localhost:3000/api/users
Update an existing user by ID:



curl -X PUT -H "Content-Type: application/json" -d '{"name": "Alice Updated", "email": "alice.updated@example.com"}' http://localhost:3000/api/users/1
Delete a user by ID:



curl -X DELETE http://localhost:3000/api/users/1
