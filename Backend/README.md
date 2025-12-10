# Backend API — Users Register Endpoint

This file documents the `/users/register` endpoint for the Uber Clone backend.

---

## Overview

- **Endpoint**: `POST /users/register`
- **Purpose**: Creates a new user account, stores the user in the database, and returns an authentication token.
- **Router path**: The route is set up in `Backend/routes/user.route.js` as `router.post('/register', ...)`. Mounting determines the final route (for example, `app.use('/users', userRoute)` would make the complete path `/users/register`).

---

## Request

- **Method**: POST
- **Headers**:
  - `Content-Type: application/json`

### Request body (JSON)

```json
{
  "fullname": {
    "firstname": "string",   // required, min length 3
    "lastname": "string"     // optional, min length 3 if provided
  },
  "email": "string",        // required, valid email, min length 5
  "password": "string"      // required, min length 6
}
```

### Field requirements and validation rules

- `fullname.firstname` (String)
  - Required
  - Minimum length: 3 characters
- `fullname.lastname` (String)
  - Optional
  - Minimum length: 3 characters (if provided)
- `email` (String)
  - Required
  - Must be valid email format
  - Minimum length: 5 characters
  - Unique in database (unique index set on `email` in Mongoose schema)
- `password` (String)
  - Required
  - Minimum length: 6 characters
  - Stored as hashed value (bcrypt is used — see `Backend/models/user.model.js`)

> Note: The validation is implemented using `express-validator` in `Backend/routes/user.route.js` for basic validation rules. Additional validation (like unique email) is enforced by the database (Mongoose unique index) and may be handled in the controller/service logic.

---

## Responses

### Success (User created)
- **Status**: `201 Created` (expected)
- **Body (example)**:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<mongo-id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null
  }
}
```

> Notes:
> - The `token` is a JWT created by the `generateAuthToken` method in `Backend/models/user.model.js` and is typically valid for 24 hours.
> - `password` is not returned (it is not selected by default in the model: `select: false`).

### Validation error
- **Status**: `400 Bad Request`
- **When**: Numeric/format violations or missing required fields detected by validator middleware
- **Body (example)**:

```json
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" },
    { "msg": "First name must be at least 3 characters long", "param": "fullname.firstname", "location": "body" }
  ]
}
```

### Duplicate email (unique constraint violation)
- **Status**: `409 Conflict` (or sometimes `400` depending on controller handling)
- **When**: Email already exists in the database
- **Body (example)**:

```json
{ "error": "Email already registered" }
```

### Server error
- **Status**: `500 Internal Server Error`
- **When**: Unexpected server error while creating the user or saving to DB
- **Body (example)**:

```json
{ "error": "Internal server error" }
```

---

## Example Requests

### cURL

```bash
curl -X POST http://localhost:5000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com",
    "password": "password123"
  }'
```

### JavaScript (fetch)

```javascript
fetch('http://localhost:5000/users/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fullname: { firstname: 'John', lastname: 'Doe' },
    email: 'john@example.com',
    password: 'password123'
  })
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch(console.error);
```

---

## Implementation notes and security

- Passwords are hashed using `bcrypt` before saving. See `userSchema.statics.hashPassword` and service/controller where password hashing should be applied.
- `email` is unique in the schema: in Mongoose it creates a unique index; duplicate entries result in an error from the DB.
- The JWT token is generated using `jwt.sign` and should use `process.env.JWT_SECRET` at runtime; token expiration is set to 24 hours in `userSchema.methods.generateAuthToken`.
- The `password` field has `select: false` so it's excluded from queries by default to prevent accidental exposure.

---

## References
- `Backend/models/user.model.js`
- `Backend/routes/user.route.js`
- `Backend/services/user.service.js` (user creation logic)

---

If you want me to also add a high-level `README.md` at the project root or add more endpoints (login, logout, profile) docs, I can do that next.

---

## Login (POST /users/login)

- **Endpoint**: `POST /users/login`
- **Purpose**: Authenticate an existing user and return a JWT token for authenticated requests.

---

## Request

- **Method**: POST
- **Headers**:
  - `Content-Type: application/json`

### Request body (JSON)

```json
{
  "email": "user@example.com",
  "password": "string"
}
```

### Field requirements and validation rules

- `email` (String)
  - Required
  - Valid email format
- `password` (String)
  - Required
  - Minimum length: 6 characters

> Note: Basic validation is implemented in `Backend/routes/user.route.js` with `express-validator`, and additional checks happen in `user.controller.js`.

---

## Responses

### Success
- **Status**: `200 OK`
- **Body (example)**:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<mongo-id>",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com",
    "socketId": null
  }
}
```

> Notes:
> - The `user` object returned excludes `password` (the controller uses `.select('+password')` to verify password and does not return it).
> - JWT token is created using `user.generateAuthToken()` and typically expires in 24 hours.

### Validation error
- **Status**: `400 Bad Request`
- **When**: `express-validator` detects invalid or missing fields.

**Body (example)**:
```json
{ "errors": [{ "msg": "Invalid Email", "param": "email", "location": "body" }] }
```

### Authentication failure
- **Status**:
  - `401 Unauthorized` — if the user (email) does not exist (as implemented in `user.controller.js`)
  - `400 Bad Request` — if password verification fails (as implemented in `user.controller.js`)
- **When**: Incorrect email or password

**Body (example)**:
```json
{ "message": "Invalid Email or Password" }
```

### Server error
- **Status**: `500 Internal Server Error`
- **When**: Unexpected server error

**Body (example)**:
```json
{ "error": "Internal server error" }
```

---

## Example Requests

### cURL

```bash
curl -X POST http://localhost:5000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### JavaScript (fetch)

```javascript
fetch('http://localhost:5000/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'john@example.com', password: 'password123' })
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch(console.error);
```

---

## Status Codes Summary (login endpoint)

| Status Code | Description |
|-------------|-------------|
| `200` | User authenticated successfully; returns token and user info |
| `400` | Validation error or bad request |
| `401` | Invalid credentials — email not found or password mismatch |
| `500` | Server error |

---

## Implementation notes (login)

- The controller `loginUser` uses `userModel.findOne({ email }).select('+password')` to include password for comparison. The `comparePassword` method compares the provided password against the stored hashed password.
- On success, `user.generateAuthToken()` returns a JWT.

---

## References (updated)
- `Backend/models/user.model.js`
- `Backend/routes/user.route.js`
- `Backend/services/user.service.js` (user creation logic)
- `Backend/controllers/user.controller.js` (login + register implementations)

---

## Profile (GET /users/profile)

- **Endpoint**: `GET /users/profile`
- **Purpose**: Return the authenticated user's profile information.
- **Auth**: Protected route. Requires a valid JWT token, either as a cookie (`token`) or in the `Authorization` header as `Bearer <token>`.

### Request
- **Method**: GET
- **Headers**:
  - `Authorization: Bearer <jwt-token>` (optional if cookie is used)
  - `Cookie: token=<jwt-token>` (optional if header is used)

### Responses
- **Success**: `200 OK` — returns the user object in the response body.
  - Body (example):

```json
{
  "_id": "<mongo-id>",
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john@example.com",
  "socketId": null
}
```

- **Unauthorized**: `401 Unauthorized` — when token is missing, invalid, expired, or blacklisted.
  - Body (example): `{ "message": "Unauthorized" }`

---

## Logout (GET /users/logout)

- **Endpoint**: `GET /users/logout`
- **Purpose**: Logs out the authenticated user by clearing the auth cookie and blacklisting the token so it cannot be used again.
- **Auth**: Protected route. Must be an authenticated user. Token should be in cookie or Authorization header as above.

### Request
- **Method**: GET
- **Headers**:
  - `Authorization: Bearer <jwt-token>` (optional if cookie is used)
  - `Cookie: token=<jwt-token>` (optional if header is used)

### Behavior
- Clears the `token` cookie on the client (`res.clearCookie('token')`).
- Stores the token in the `BlacklistToken` collection (`blacklistTokenModel`) to prevent reuse of a token that has been logged out.
  - The `BlacklistToken` model has an auto-expire TTL (24 hours) matching the token expiration.

### Responses
- **Success**: `200 OK` — returns `{ "message": "Logged out" }`.
- **Unauthorized**: `401 Unauthorized` — when token is missing/invalid/blacklisted.

Example Body (success):
```json
{ "message": "Logged out" }
```

---

## Example Requests (profile & logout)

### Profile (cURL)
```bash
curl -X GET http://localhost:5000/users/profile \
  -H "Authorization: Bearer <jwt-token>"
```

Or with cookie:
```bash
curl -X GET http://localhost:5000/users/profile --cookie "token=<jwt-token>"
```

### Logout (cURL)
```bash
curl -X GET http://localhost:5000/users/logout \
  -H "Authorization: Bearer <jwt-token>"
```

Or with cookie:
```bash
curl -X GET http://localhost:5000/users/logout --cookie "token=<jwt-token>"
```

### JavaScript (fetch) — Profile
```javascript
fetch('http://localhost:5000/users/profile', {
  method: 'GET',
  headers: { 'Authorization': 'Bearer <jwt-token>' }
})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
```

### JavaScript (fetch) — Logout
```javascript
fetch('http://localhost:5000/users/logout', {
  method: 'GET',
  headers: { 'Authorization': 'Bearer <jwt-token>' },
  credentials: 'include'
})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
```

---

## Implementation notes (profile & logout)

- `auth.middleware.js` reads token from the cookie or the `Authorization` header and returns 401 when token is missing or invalid.
- The token is checked against the blacklist (blacklist model) before allowing access. If token is blacklisted, the middleware should return 401.
- `logoutUser` uses `blacklistTokenModel.create({ token })` to persist the token; it also clears the cookie.
- The `BlacklistToken` entries expire in 24 hours by design (see `models/blacklistToken.model.js`) so tokens are effectively invalidated for the remaining duration when logged out.


