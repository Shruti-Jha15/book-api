# Book Catalog API

Lightweight REST API for managing a book catalog with user authentication (JWT).

## Contents
- Quick setup
- Environment variables
- Run locally
- Postman testing (local & HTTPS)

---

## Quick setup

1. Clone your repo (replace with your GitHub URL):

```bash
git clone https://github.com/<your-user>/<your-repo>.git
cd book-catalog-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root. Example values are below.

## Environment variables (`.env`)

Create a `.env` file with at least the following values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/book-catalog
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

Notes:
- To use MongoDB Atlas replace `MONGO_URI` with your Atlas connection string.
- Keep `JWT_SECRET` secret in production.

## Run the server

Start the API locally:

```bash
# start with node
node server.js

# or with npm (if `start` script exists)
npm start
```

The API will listen on the `PORT` from `.env` (default 5000). Default base URL:

`http://localhost:5000`

## Endpoints (important)

- `POST /api/users/register` - register new user
- `POST /api/users/login` - login and receive JWT
- `GET /api/books` - list books
- `POST /api/books` - create book (requires `Authorization: Bearer <token>`)

## Postman testing

There is a Postman collection and environment included in the repo:

- `Book_Catalog_API.postman_collection.json`
- `BookAPI.postman_environment.json`

Steps to test locally:

1. Open Postman → Import → choose `Book_Catalog_API.postman_collection.json`.
2. Import the environment file `BookAPI.postman_environment.json` (optional).
3. Edit the collection or environment `baseUrl` variable to `http://localhost:5000`.
4. Use the `Register` request to create a user, then `Login` to get the JWT.
5. Copy the returned token and set the `Authorization` header for protected requests:

```
Authorization: Bearer <token>
```

Testing against an HTTPS deployment (Heroku / Vercel / Render / other):

1. Deploy your app and obtain the HTTPS URL (for example `https://your-app.example.com`).
2. In Postman set `baseUrl` (or directly the request URL) to the HTTPS URL.
3. Run `POST /api/users/login` on the HTTPS URL, copy the token, and call protected endpoints using the `Authorization: Bearer <token>` header.

Example HTTPS login URL:

```
https://your-production-url.example.com/api/users/login
```

## Quick curl examples

Register:

```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Password123"}'
```

Login (get JWT):

```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123"}'
```

Authenticated request example (replace `<TOKEN>`):

```bash
curl -X GET http://localhost:5000/api/books \
  -H "Authorization: Bearer <TOKEN>"
```

## Troubleshooting

- 401 on login: ensure `.env` has `JWT_SECRET` set and that the client email matches (case-insensitive). This repo normalizes emails on register/login.
- No token provided on protected routes: include header `Authorization: Bearer <token>`.
- MongoDB connection issues: verify `MONGO_URI` and that MongoDB is reachable.

## Post-deploy tips

- Use a secure `JWT_SECRET` stored in your host provider's environment settings.
- Set `NODE_ENV=production` and configure CORS/origin restrictions as needed.

---

