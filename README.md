﻿# GroceryX server

## Installation:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the server using `npm run dev`.

## Configuration:

- Environment Variables:
  - `PORT`: Port number the server listens on. Default: 3000
  - `MONGODB_URI`: URI for MongoDB database.
  - `MODE`: Development environment.
  - `CLIENT_URL_LOCAL`: [http://localhost:3000](http://localhost:3000).
  - `CLIENT_URL_PROD`: [https://example.vercel.app](https://example.vercel.app).

## Dependencies:

- `cors`: Express middleware for enabling CORS.
- `dotenv`: Loads environment variables from .env file.
- `express`: Web framework for Node.js.
- `mongodb`: MongoDB driver for Node.js.
- `nodemon`: Utility for automatically restarting the server during development.
