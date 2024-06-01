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

   ```bash
   git clone https://github.com/harshPsxk/project-cron.git
   cd project-cron
   
2. **Install dependencies:**

   ```bash
   npm install
   
3. **Environment Variables**
   -Fill in the values for DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, and DB_PORT in the .env file.
   ```bash
   DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=user_management
    DB_PORT=3306

  
