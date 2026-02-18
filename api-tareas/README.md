# API de tareas y productos

API desarrollada con Node.js y Express para cubrir las Actividades 3 y 4.

## Funcionalidades

- Autenticación con JWT y contraseñas encriptadas con bcryptjs.
- CRUD de tareas con almacenamiento en archivo JSON (`tareas.json`) usando `fs.promises`.
- Rutas de tareas protegidas por token.
- CRUD de productos con MongoDB + Mongoose.
- Manejo global de errores (404 y 500).

## Endpoints

### Salud

- `GET /health`

### Autenticación

- `POST /register`
- `POST /login`
- `POST /auth/register`
- `POST /auth/login`

### Tareas (requieren Bearer token)

- `GET /tareas`
- `POST /tareas`
- `PUT /tareas/:id`
- `DELETE /tareas/:id`

### Productos (requieren Bearer token y MongoDB)

- `GET /productos`
- `POST /productos`
- `PUT /productos/:id`
- `DELETE /productos/:id`

## Instalación

```bash
npm install
cp .env.example .env
npm start
```

## Variables de entorno

```env
PORT=3000
JWT_SECRET=tu_clave_secreta
MONGO_URI=tu_cadena_mongodb
```

## Debug

```bash
node --inspect server.js
```

## Tests

```bash
npm test
```
