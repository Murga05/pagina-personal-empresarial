# API Tareas y Productos (Actividades 3 y 4)

Proyecto Node.js con Express.js que incluye:

- API RESTful de tareas (archivo `tareas.json` usando `fs.promises`).
- Autenticación con `bcryptjs` + `jsonwebtoken` (`/auth/register`, `/auth/login`).
- Rutas protegidas con middleware JWT (`/tareas` y `/productos`).
- Módulo de productos con MongoDB + Mongoose (Actividad 4).
- Vista estática de login en `src/public/login.html`.
- Pruebas unitarias con Jest + Supertest.
- Pipeline CI/CD base con GitHub Actions.

## Requisitos

- Node.js 18+
- MongoDB local o remoto (opcional para `/productos`, obligatorio si quieres ese módulo activo)

## Instalación

```bash
npm install
cp .env.example .env
npm run start
```

Servidor en `http://localhost:3000`.

## Endpoints principales

### Autenticación

- `POST /auth/register`
- `POST /auth/login`

### Tareas (protegidas)

- `GET /tareas`
- `POST /tareas`
- `PUT /tareas/:id`
- `DELETE /tareas/:id`

### Productos (protegidas + MongoDB)

- `GET /productos`
- `POST /productos`
- `PUT /productos/:id`
- `DELETE /productos/:id`

## Debugging

Puedes iniciar el servidor en modo depuración:

```bash
node --inspect server.js
```

## Pruebas

```bash
npm test
```

## Despliegue sugerido

- Plataforma SaaS: Render/Vercel/Railway (Node.js).
- CI/CD: flujo en `.github/workflows/ci-cd.yml`.

