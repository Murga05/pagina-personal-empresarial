# Entrega final - Página web + API

Este repo tiene mi entrega completa en dos partes:

- Página web en la raíz (`index.html`, `styles.css`, `app.js`).
- API en `api-tareas/` para las actividades 3 y 4.

## Página web

La página incluye:

- Presentación de la marca.
- Proyectos destacados con imágenes.
- Formulario de contacto con validación.
- Gestor de tareas en el navegador.

Para verla rápido, abre `index.html` en tu navegador.

## API (actividad 3 y 4)

La API está en `api-tareas` y tiene:

- Express en puerto 3000.
- CRUD de tareas con `tareas.json` usando `fs.promises`.
- Registro/login con JWT y contraseñas con bcrypt.
- Rutas protegidas por token.
- Productos con MongoDB y Mongoose.
- Pruebas con Jest y Supertest.

## Endpoints principales

Auth:

- `POST /register`
- `POST /login`
- `POST /auth/register`
- `POST /auth/login`

Tareas:

- `GET /tareas`
- `POST /tareas`
- `PUT /tareas/:id`
- `DELETE /tareas/:id`

Productos:

- `GET /productos`
- `POST /productos`
- `PUT /productos/:id`
- `DELETE /productos/:id`

Salud:

- `GET /health`

## Cómo correr el backend

```bash
cd api-tareas
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

## Pruebas

```bash
cd api-tareas
npm test
```


## Deploy en Vercel (frontend)

Ya está preparado un workflow de GitHub Actions para desplegar en Vercel cuando hagas push a `main` o `master`.

Configura estos secrets en GitHub:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

> Nota: en Vercel debes vincular el proyecto una vez para que `vercel pull` funcione correctamente.
