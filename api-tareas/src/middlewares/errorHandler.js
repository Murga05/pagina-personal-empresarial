const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error('[ERROR]', err.message);

  res.status(statusCode).json({
    message: err.message || 'Error interno del servidor',
  });
};

module.exports = { errorHandler };
