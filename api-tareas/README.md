# API de tareas y productos

Backend hecho con Node.js + Express para actividades 3 y 4.

## Incluye

- Registro e inicio de sesión con JWT.
- Hash de contraseña con bcryptjs.
- CRUD de tareas guardadas en `tareas.json`.
- CRUD de productos con MongoDB (Mongoose).
- Middleware de autenticación, 404 y errores.

## Rutas

### Auth

- `POST /register`
- `POST /login`
- `POST /auth/register`
- `POST /auth/login`

### Tareas (Bearer token)

- `GET /tareas`
- `POST /tareas`
- `PUT /tareas/:id`
- `DELETE /tareas/:id`

### Productos (Bearer token + MongoDB)

- `GET /productos`
- `POST /productos`
- `PUT /productos/:id`
- `DELETE /productos/:id`

### Verificación

- `GET /health`

## Instalación

```bash
npm install
cp .env.example .env
npm start
```

## Variables de entorno

```env
PORT=3000
JWT_SECRET=tu_clave
MONGO_URI=tu_uri_mongodb
```

## Debug

```bash
node --inspect server.js
```

## Tests

```bash
npm test
```
