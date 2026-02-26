# Excelora Frontend

This is the Vite + React frontend for the Excelora Class Management project.

Quick start

1. Install dependencies

```bash
cd frontend
npm install
```

2. Create `.env` from `.env.example` and set `VITE_BACKEND_URL`.

3. Run dev server

```bash
npm run dev
```

Notes

- Uses TailwindCSS for styling.
- Auth state stored in `localStorage` by `AuthContext`.
- `src/services/api.js` uses `VITE_BACKEND_URL`.
