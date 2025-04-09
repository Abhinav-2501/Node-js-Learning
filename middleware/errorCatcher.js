// This middleware will wrap route handlers to catch errors before API calls
const errorCatcher = (fn) => {
    return async (req, res, next) => {
      try {
        await fn(req, res, next);
      } catch (error) {
        next(error); // Forward to error logger middleware
      }
    };
  };
  
  module.exports = errorCatcher;