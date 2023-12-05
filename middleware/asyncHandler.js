const asyncHandler = (fn) => (req, res, next) => {
  console.log(`Request: ${req.method} ${req.baseUrl}${req.url}`);
  return Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
