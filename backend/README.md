# Excelora Backend

Minimal scaffold for the Excelora class management backend.

Quick start

1. Install dependencies

```bash
cd backend
npm install
```

2. Create `.env` from `.env.example` and set `MONGO_URI` and `JWT_SECRET`.

3. Run in development

```bash
npm run dev
```

API endpoints

- `POST /api/auth/register` - register user
- `POST /api/auth/login` - login
- `GET /api/auth/me` - get current user (protected)

This scaffold includes models, middleware, and simple auth. Continue by adding class, payment, and admin controllers.
