# Developer Onboarding Application - Backend

## Overview

The Developer Onboarding Application is designed to facilitate the onboarding process for developers. It includes functionality for developers to sign in, fill out an onboarding form, and allows clients to access details of registered developers.
### Deployment(Rander)
**DeployeLink*: (https://remoteengineapi.onrender.com)
## Tech Stack

- **Node.js:** Server-side JavaScript runtime.
- **Express:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing developer and related data.
- **EncryptJS:** Used for encrypting sensitive information.
- **JSON Web Token (JWT):** Token-based authentication for secure communication.
  ### Dependancies
  ```javascript
  
     `npm install mongoose`
     `npm install express`
     `npm install jsonwebtoken`
     `npm install bcryptjs`
     `npm install dotenv`
     `npm install cors`
     `npm install node`

## Project Structure

The project is structured with the following main components:

- **User:** Represents a user with email, password, and role (client or developer).
  
  ```javascript
  const User = require('./models/User');
- **Skill:** Represents predefined skills for developers.
  
  ```javascript
  const Skill = require('./models/Skill');
  
- **Professional Experience:** Represents a developer's professional experience.
  ```javascript
  const ProfessionalExperience = require('./models/ProfessionalExperience');

- **Education Experience:** Represents a developer's educational experience.
  ```javascript
    const EducationExperience = require('./models/EducationExperience');
- **Developer:** Main model representing a developer with personal, skills, and experience details.
  ```javascript
    const Developer = require('./models/Developer');


## API Endpoints

### User Authentication:

#### Register a new user:

- **Endpoint:** `/user/register` (POST)
- **Description:** Register a new user (developer or client).

#### User Login:

- **Endpoint:** `/user/login` (POST)
- **Description:** Sign in with email and password.

### Developer Onboarding:

#### Onboard a new developer:

- **Endpoint:** `/developers/onboarding` (POST)
- **Description:** Onboard a new developer. (Authentication required)

### Developer Profile:

#### Get predefined Skills:
- **Endpoint:** `/skills/get` (GET)
- **Endpoint:** `/skills/post` (POST)
#### Get developer profile:

- **Endpoint:** `/developers/profile` (GET)
- **Description:** Get details of the authenticated developer's profile. (Authentication required)

### Client Developer Profile:

#### Get specific  profile:

- **Endpoint:** `/client/developerprofile` (GET)
- **Description:** Get details of a specific developer's profile. (Authentication required, client role only)

## Authentication

Authentication is required for certain routes, and only clients with the role 'client' can access specific routes.

- **Token-based Authentication:**
  - Include the generated JWT token in the Authorization header for authenticated requests.

## Deployment

The application is ready to be deployed on platforms like Rander. Ensure that environment variables are properly configured for security.
