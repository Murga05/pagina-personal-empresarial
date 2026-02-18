const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const { connectDB } = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const productRoutes = require('./src/routes/productRoutes');
const { notFound } = require('./src/middlewares/notFound');
const { errorHandler } = require('./src/middlewares/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src/public')));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API de tareas y productos activa',
    docs: '/docs',
    loginView: '/login.html',
  });
});

app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'PROJECT_DOCUMENTATION.md'));
});

app.use('/auth', authRoutes);
app.use('/tareas', taskRoutes);
app.use('/productos', productRoutes);

app.use(notFound);
app.use(errorHandler);

if (require.main === module) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Error al iniciar la aplicación:', error.message);
      process.exit(1);
    });
}

module.exports = app;
