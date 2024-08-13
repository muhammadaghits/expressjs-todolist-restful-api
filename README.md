# BTS.id Backend Test Node.js

This is a test for the backend developer position at BTS.id. The test is to create a Todolist RESTful API using Node.js and Express.js.

## Technologies

- Node.js
- Express.js
- MySQL
- Prisma

## How to run locally

These instructions will guide you on how to set up the app locally. Using GitBash terminal is preferred.

1. Clone the repository:

  ```bash
  git clone git@github.com:muhammadaghits/expressjs-todolist-restful-api.git
  ```

2. Install dependencies:

  ```bash
  npm install
  ```

3. Configure the environment variables:

- Copy `.env.example` to `.env`:

  ```bash
  cp .env.example .env
  ```
- Open the `.env` file and set the environment variables as needed. The following environment variables are required (for example)

    ```bash
    DATABASE_URL="mysql://DB_USERNAME:DB_PASSWORD@DB_HOST:PORT/DB_NAME"

    JWT_SECRET="your-secret-key-here"
    JWT_EXPIRES_IN="12h"
    ```
4. Run the migrations:

  ```bash
  npx prisma migrate dev 
  ```
5. Start the server:

  ```bash
  npm start
  ```