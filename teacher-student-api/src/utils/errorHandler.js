module.exports = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};
