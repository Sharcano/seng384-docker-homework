# Person Management System

Full-stack CRUD application using React + Vite, Node.js + Express, PostgreSQL, and Docker Compose.

## Project Structure

```
seng384-docker-hw/
├── docker-compose.yml          # Orchestrates all 3 services
├── README.md
│
├── db/
│   └── init.sql                # CREATE TABLE people
│
├── backend/
│   ├── Dockerfile
│   ├── package.json            # express, pg, cors
│   ├── index.js                # Express entry point
│   ├── db/
│   │   └── pool.js             # pg Pool (DATABASE_URL)
│   └── routes/
│       └── people.js           # CRUD routes for /api/people
│
└── frontend/
    ├── Dockerfile
    ├── package.json            # react, react-dom, react-router-dom, vite
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx            # React entry point
        ├── App.jsx             # Route definitions
        ├── pages/
        │   ├── RegisterPage.jsx    # "/" – registration form
        │   └── PeoplePage.jsx      # "/people" – table with Edit/Delete
        └── services/
            └── api.js          # fetch helpers for /api/people
```

## How to Run

```bash
docker compose up --build
```

| Service  | URL                    |
|----------|------------------------|
| Frontend | http://localhost:5173  |
| Backend  | http://localhost:5000  |
| Postgres | localhost:5432         |
