const jwt = require('jsonwebtoken');

// Middleware to authenticate requests and check user roles
const auth = (roles = []) => {
  return (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
      // Verify the token using the JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Check if the user's role is allowed to access the route
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
      }

      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token.' });
    }
  };
};

module.exports = auth;