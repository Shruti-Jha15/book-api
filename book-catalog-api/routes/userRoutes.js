/**
 * User Routes
 * Defines routes for user authentication (register and login)
 */

const express = require('express');
const { register, login } = require('../controllers/userController');

const router = express.Router();

/**
 * POST /api/users/register
 * Register a new user
 */
router.post('/register', register);

/**
 * POST /api/users/login
 * Login user and return JWT token
 */
router.post('/login', login);

module.exports = router;
