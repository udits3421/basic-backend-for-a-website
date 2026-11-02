# Intro to Backend - Node.js & Express REST API

A complete backend implementation built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)** following the Model-Route-Controller (MRC) architectural pattern.

---

## 🚀 How to Run the Server

### 1. Start the server
In your terminal, run either:
```bash
npm run dev
```
*(uses nodemon for automatic reloads on file changes)*

Or run directly:
```bash
npm start
```

When started, you will see:
```text
MongoDB Connected! DB Host: ...
Server is running on port: 4000
```

---

## 🔍 How to Check If It Is Working

### 1. Test in Your Web Browser
Open your browser and navigate to:
```
http://localhost:4000/
```
You should see:
```json
{
  "status": "OK",
  "message": "Intro to Backend API is running successfully!"
}
```

---

## 📡 API Endpoints & Testing Guide

You can test these endpoints using **Postman**, **Thunder Client** (VS Code extension), or **curl / PowerShell**.

### 👤 User Endpoints (`/api/v1/users`)

#### 1. Register User
- **Method:** `POST`
- **URL:** `http://localhost:4000/api/v1/users/register`
- **Body (`application/json`):**
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "mypassword123"
  }
  ```
- **Response (`201 Created`):**
  ```json
  {
    "message": "User registered",
    "user": {
      "id": "67...",
      "email": "john@example.com",
      "username": "john_doe"
    }
  }
  ```

#### 2. User Login
- **Method:** `POST`
- **URL:** `http://localhost:4000/api/v1/users/login`
- **Body (`application/json`):**
  ```json
  {
    "email": "john@example.com",
    "password": "mypassword123"
  }
  ```
- **Response (`200 OK`):**
  ```json
  {
    "message": "User Logged in",
    "user": {
      "id": "67...",
      "email": "john@example.com",
      "username": "john_doe",
      "loggedIn": true
    }
  }
  ```

#### 3. Get All Users
- **Method:** `GET`
- **URL:** `http://localhost:4000/api/v1/users`

#### 4. User Logout
- **Method:** `POST`
- **URL:** `http://localhost:4000/api/v1/users/logout`
- **Body (`application/json`):**
  ```json
  {
    "email": "john@example.com"
  }
  ```

---

### 📝 Post Endpoints (`/api/v1/posts`)

#### 1. Create Post
- **Method:** `POST`
- **URL:** `http://localhost:4000/api/v1/posts`
- **Body (`application/json`):**
  ```json
  {
    "title": "My First Post",
    "content": "This is the content of my post.",
    "author": "john@example.com"
  }
  ```
- **Response (`201 Created`):** Returns the newly created post with ID.

#### 2. Get All Posts
- **Method:** `GET`
- **URL:** `http://localhost:4000/api/v1/posts`

#### 3. Get Post by ID
- **Method:** `GET`
- **URL:** `http://localhost:4000/api/v1/posts/<POST_ID>`

#### 4. Update Post
- **Method:** `PUT` or `PATCH`
- **URL:** `http://localhost:4000/api/v1/posts/<POST_ID>`
- **Body (`application/json`):**
  ```json
  {
    "title": "Updated Title",
    "content": "Updated content goes here."
  }
  ```

#### 5. Delete Post
- **Method:** `DELETE`
- **URL:** `http://localhost:4000/api/v1/posts/<POST_ID>`
