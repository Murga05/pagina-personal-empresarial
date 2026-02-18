# Proyecto final - Página personal + API de tareas

Este repositorio contiene la entrega de las actividades del curso, dividida en dos partes:

- **Frontend** en la raíz (`index.html`, `styles.css`, `app.js`).
- **Backend** en `api-tareas/` (Node.js + Express + JWT + MongoDB).

## 1) Frontend (página personal)

La página principal presenta:

- Sección de presentación de marca.
- Sección de proyectos destacados.
- Formulario de contacto con validaciones.
- Gestor de tareas en interfaz.

Archivos principales:

- `index.html`
- `styles.css`
- `app.js`

## 2) Backend (Actividades 3 y 4)

Carpeta: `api-tareas/`

### Actividad 3 implementada

- Servidor básico con Express en puerto 3000.
- Rutas CRUD de tareas:
  - `GET /tareas`
  - `POST /tareas`
  - `PUT /tareas/:id`
  - `DELETE /tareas/:id`
- Persistencia con `fs.promises` usando `tareas.json`.
- Registro e inicio de sesión:
  - `POST /register`
  - `POST /login`
  - `POST /auth/register`
  - `POST /auth/login`
- Contraseñas con `bcryptjs` y autenticación con JWT.
- Middleware de errores y middleware 404.

### Actividad 4 implementada

- Conexión a MongoDB con Mongoose para recurso `productos`.
- Rutas protegidas con middleware JWT.
- Vista estática para login en `api-tareas/src/public/login.html`.
- Pruebas automatizadas con Jest + Supertest.
- Flujo base de CI/CD en GitHub Actions.

## 3) Tecnologías usadas

- HTML5, CSS3, JavaScript
- Node.js, Express
- bcryptjs, jsonwebtoken
- Mongoose (MongoDB)
- Jest, Supertest

## 4) Cómo ejecutar localmente

### Frontend

Abre `index.html` directamente en el navegador o con Live Server en VS Code.

### Backend

```bash
cd api-tareas
npm install
cp .env.example .env
npm start
```

Servidor disponible en:

- `http://localhost:3000`
- `http://localhost:3000/health`
- `http://localhost:3000/login.html`

## 5) Variables de entorno

En `api-tareas/.env`:

```env
PORT=3000
JWT_SECRET=tu_clave_secreta
MONGO_URI=tu_cadena_mongodb
```

## 6) Pruebas

```bash
cd api-tareas
npm test
```

## 7) Evidencias para entrega

Para la entrega final se recomienda adjuntar:

- URL del repositorio en GitHub.
- Documento con requerimientos funcionales y no funcionales.
- Explicación del manejo de rutas, archivos y autenticación.
- Video demostrando CRUD, autenticación y protección de rutas.
