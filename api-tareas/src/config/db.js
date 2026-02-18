const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.log('MONGO_URI no configurado. La API seguirá disponible para /auth y /tareas con almacenamiento JSON.');
    return;
  }

  await mongoose.connect(mongoUri, {
    dbName: process.env.MONGO_DB_NAME || 'api_tareas_db',
  });

  console.log('Conectado a MongoDB');
};

module.exports = { connectDB };
