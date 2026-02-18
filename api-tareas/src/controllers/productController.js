const mongoose = require('mongoose');
const Product = require('../models/Product');

const ensureMongoConnection = () => {
  if (mongoose.connection.readyState !== 1) {
    const error = new Error('MongoDB no está conectado. Configura MONGO_URI para usar /productos.');
    error.statusCode = 503;
    throw error;
  }
};

const getProducts = async (req, res, next) => {
  try {
    ensureMongoConnection();
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    ensureMongoConnection();
    const { nombre, descripcion, precio } = req.body;

    if (!nombre || !descripcion || precio === undefined) {
      return res.status(400).json({ message: 'nombre, descripcion y precio son obligatorios' });
    }

    const product = await Product.create({ nombre, descripcion, precio });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    ensureMongoConnection();
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json(product);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID inválido' });
    }
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    ensureMongoConnection();
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID inválido' });
    }
    next(error);
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
