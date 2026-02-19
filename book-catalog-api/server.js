/**
 * Main Server File
 * Entry point for the Book Catalog API
 * Initializes Express app, connects to MongoDB, and sets up routes
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// ==================== Middleware ====================

// Enable CORS
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// ==================== Routes ====================

/**
 * Default route
 * GET /
 */
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Book Catalog API',
    version: '1.0.0',
    endpoints: {
      users: {
        register: 'POST /api/users/register',
        login: 'POST /api/users/login',
      },
      books: {
        getAll: 'GET /api/books',
        getById: 'GET /api/books/:id',
        create: 'POST /api/books (requires auth)',
        update: 'PUT /api/books/:id (requires auth)',
        delete: 'DELETE /api/books/:id (requires auth)',
      },
    },
  });
});

/**
 * User routes
 * All authentication-related endpoints
 */
app.use('/api/users', userRoutes);

/**
 * Book routes
 * All book management endpoints
 */
app.use('/api/books', bookRoutes);

/**
 * 404 - Not Found handler
 * Catches all undefined routes
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

/**
 * Error handling middleware
 * Catches and handles all errors
 */
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// ==================== Server Startup ====================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     Book Catalog API Started            ║
║                                         ║
║     Environment: ${process.env.NODE_ENV || 'development'           .padEnd(21)}║
║     Port: ${PORT.toString().padEnd(29)}║
║     API URL: http://localhost:${PORT} ║
╚════════════════════════════════════════╝
  `);
});

module.exports = app;
