# Developer Onboarding Application - Backend

## Overview

The Developer Onboarding Application is designed to facilitate the onboarding process for developers. It includes functionality for developers to sign in, fill out an onboarding form, and allows clients to access details of registered developers.

## Tech Stack

- **Node.js:** Server-side JavaScript runtime.
- **Express:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing developer and related data.
- **EncryptJS:** Used for encrypting sensitive information.
- **JSON Web Token (JWT):** Token-based authentication for secure communication.

## Project Structure

The project is structured with the following main components:

- **User:** Represents a user with email, password, and role (client or developer).
  
  ```javascript
  const User = require('./models/User');
