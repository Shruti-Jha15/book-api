/**
 * Authentication Middleware
 * Verifies JWT tokens and protects routes
 */

const jwt = require('jsonwebtoken');

/**
 * Middleware to protect routes
 * Verifies JWT token from Authorization header
 * Attaches decoded user to req.user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please provide a valid JWT token in Authorization header',
      });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.slice(7);

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user to request object
    req.user = decoded;

    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
    });
  }
};

module.exports = authMiddleware;
