function errorHandler(err, req, res, next) {
  let message = 'Something went wrong';
  let status = 500;
  console.log(err);

  if(err.name === 'ValidationError') {
    message = err.message;
    status = 422;
  } else if(err.code === 11000) {
    message = err.message;
    status = 409;
  }
  res.status(status).json({ message });
  next(err);
}

module.exports = errorHandler;
