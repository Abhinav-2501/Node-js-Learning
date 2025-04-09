const RequestLog = require('../models/RequestLog');

const requestLogger = (req, res, next) => {
  // Store original methods
  const originalSend = res.send;
  const originalJson = res.json;
  const originalEnd = res.end;
  
  // Start time for request
  const startTime = Date.now();
  
  // Capture response data
  let responseBody;
  
  // Override send method
  res.send = function(body) {
    responseBody = body;
    return originalSend.apply(res, arguments);
  };
  
  // Override json method
  res.json = function(body) {
    responseBody = JSON.stringify(body);
    return originalJson.apply(res, arguments);
  };
  
  // Override end method to log after response is sent
  res.end = function(chunk, encoding) {
    // Calculate response time
    const responseTime = Date.now() - startTime;
    
    // Log request/response data asynchronously
    (async () => {
      try {
        let parsedBody;
        try {
          parsedBody = typeof responseBody === 'string' ? JSON.parse(responseBody) : responseBody;
        } catch (e) {
          parsedBody = responseBody;
        }
        
        await RequestLog.create({
          response: parsedBody,
          statusCode: res.statusCode,
          body: req.body,
          method: req.method,
          url: req.originalUrl,
          responseTime: responseTime
        });
      } catch (err) {
        console.error('Request logging error:', err.message);
      }
    })();
    
    return originalEnd.apply(res, arguments);
  };
  
  next();
};

module.exports = requestLogger;