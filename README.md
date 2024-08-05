# Tic-Tac-Toe Game

This project is a simple Tic-Tac-Toe game built using Spring Boot for the backend, ReactJS for the frontend, and MongoDB for the database. Docker is used to containerize the services for easy deployment and development.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
  - [Backend (Spring Boot)](#backend-spring-boot)
  - [Frontend (ReactJS)](#frontend-reactjs)
  - [Database (MongoDB)](#database-mongodb)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Docker Setup](#docker-setup)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- Docker and Docker Compose
- Java 17 or later
- Node.js and npm
- MongoDB (if running locally without Docker)

## Setup

### Backend (Spring Boot)

1. Navigate to the backend directory:

    ```bash
    cd tictactoe
    ```

2. Build the Spring Boot application:

    ```bash
    ./mvnw clean package
    ```

### Frontend (ReactJS)

1. Navigate to the frontend directory:

    ```bash
    cd tictactoe-frontend
    ```

2. Install dependencies and build the React application:

    ```bash
    npm install
    npm run build
    ```

### Database (MongoDB)

Ensure MongoDB is running locally or via Docker. The default configuration connects to `mongodb://localhost:27017/tictactoe`.

## Running the Application

### Using Docker Compose

1. Ensure Docker and Docker Compose are installed.
2. Navigate to the project root directory.
3. Run the following command:

    ```bash
    docker-compose up --build
    ```

This will start the MongoDB, Spring Boot backend, and ReactJS frontend services.

### Without Docker

If you prefer to run the services individually without Docker, follow these steps:

#### Start MongoDB

Ensure MongoDB is running on `localhost:27017`.

#### Start Backend

1. Navigate to the backend directory:

    ```bash
    cd path-to-backend
    ```

2. Run the Spring Boot application:

    ```bash
    ./mvnw spring-boot:run
    ```

#### Start Frontend

1. Navigate to the frontend directory:

    ```bash
    cd path-to-frontend
    ```

2. Start the React application:

    ```bash
    npm start
    ```

## API Endpoints

- **Create a new game**

  ```http
  POST /api/games
