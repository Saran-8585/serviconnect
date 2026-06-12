const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.code === 'SQLITE_CONSTRAINT') {
    if (err.message.includes('UNIQUE constraint')) {
      return res.status(409).json({ message: 'Resource already exists.' });
    }
    return res.status(409).json({ message: 'Database constraint violation.' });
  }

  if (err.code === 'SQLITE_BUSY') {
    return res.status(503).json({ message: 'Database busy. Please try again.' });
  }

  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : 'Internal server error.';

  res.status(statusCode).json({ message });
};

module.exports = errorHandler;
