# iNotebook

A full-stack MERN application for creating, managing, and organizing personal notes. Users can sign up, log in, and securely manage their own notes — each user only has access to their own data, enforced via JWT authentication.

## Features

- User authentication (Signup / Login) using JWT
- Passwords hashed with bcrypt
- Create, read, update, and delete notes
- Notes are private to each authenticated user
- Toast-style alerts for user feedback (success/error)
- Responsive UI built with Bootstrap

## Tech Stack

**Frontend**
- React
- React Router DOM
- Context API for state management (notes & alerts)
- Bootstrap

**Backend**
- Node.js / Express
- MongoDB with Mongoose
- JSON Web Tokens (jsonwebtoken) for auth
- bcryptjs for password hashing
- express-validator for request validation
- CORS

## Project Structure

```
inotebook/
├── backend/
│   ├── middleware/
│   │   └── fetchuser.js       # Verifies JWT and attaches user to request
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Notes.js           # Note schema
│   ├── routes/
│   │   ├── auth.js            # Signup / Login / Get user routes
│   │   └── notes.js           # CRUD routes for notes
│   ├── db.js                  # MongoDB connection
│   ├── index.js               # Express app entry point
│   └── package.json
│
├── public/                    
├── src/
│   ├── components/
│   │   ├── About.js
│   │   ├── AddNote.js
│   │   ├── Alert.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Navbar.js
│   │   ├── NoteItem.js
│   │   ├── Notes.js
│   │   └── Signup.js
│   ├── context/
│   │   └── notes/
│   │       ├── noteContext.js
│   │       └── noteState.js   # Global note & alert state, API calls
│   ├── App.js
│   ├── App.css
│   └── index.js
│
├── .gitignore
└── package.json                # Frontend (root) package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) running locally, or a MongoDB Atlas connection string

### 1. Clone the repository

```bash
git clone https://github.com/Taahaomer/InoteBook
cd inotebook
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
JWT_SECRET=your_long_random_secret_here
MONGO_URI=mongodb://127.0.0.1:27017/inotebook
PORT=5000
```
### 3. Project Setup

Once both `npm install` steps above have been run (root and `backend/`), you can start the frontend and backend together from the project root with:
### Run both servers at once 
```bash
npm run both
```
and the both servers will start

This uses `concurrently` to run `react-scripts start` and `nodemon backend/index.js` in parallel.

### if you want to setup Frontend and Backend separately

Start the backend server:

```bash
npx nodemon index.js
```

The API will run on `http://localhost:5000`.

Start the Frontend server:

From the project root:

```bash
npm install
npm start
```

The app will run on `http://localhost:3000`.

## API Endpoints

All routes are prefixed with `/api`.

### Auth Routes (`/api/auth`)

| Method | Endpoint         | Description                  | Auth Required |
|--------|------------------|-------------------------------|----------------|
| POST   | `/createuser`    | Register a new user           | No             |
| POST   | `/loginuser`     | Log in and receive JWT token  | No             |
| POST   | `/getuser`       | Get logged-in user's details  | Yes            |

### Notes Routes (`/api/notes`)

| Method | Endpoint                  | Description             | Auth Required |
|--------|----------------------------|--------------------------|----------------|
| GET    | `/fetchallnotes`           | Fetch all notes for user | Yes            |
| POST   | `/addnote`                 | Add a new note           | Yes            |
| PUT    | `/updatenote/:id`          | Update an existing note  | Yes            |
| DELETE | `/deletenote/:id`          | Delete a note            | Yes            |

Authenticated requests must include an `auth-token` header containing the JWT received at login/signup.

## Environment Variables

| Variable     | Description                              | Used In   |
|--------------|--------------------------------------------|-----------|
| `JWT_SECRET` | Secret key used to sign/verify JWT tokens | backend   |
| `MONGO_URI`  | MongoDB connection string                 | backend   |
| `PORT`       | Port the backend server runs on           | backend   |

## Scripts

**Backend**
```bash
npx nodemon ./index.js   # Run backend with auto-reload
```

**Frontend (run from project root)**
```bash
npm run both             # Run frontend + backend together (requires backend/ deps installed too)
npm start               # Run frontend in development mode
npm run build           # Build frontend for production

```

## License

ISC
