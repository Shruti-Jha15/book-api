/**
 * Book Routes
 * Defines routes for book management (CRUD operations)
 */

const express = require('express');
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * GET /api/books
 * Get all books (public route)
 */
router.get('/', getAllBooks);

/**
 * GET /api/books/:id
 * Get a specific book by ID (public route)
 */
router.get('/:id', getBookById);

/**
 * POST /api/books
 * Create a new book (protected route - requires authentication)
 */
router.post('/', authMiddleware, createBook);

/**
 * PUT /api/books/:id
 * Update a book by ID (protected route - requires authentication)
 */
router.put('/:id', authMiddleware, updateBook);

/**
 * DELETE /api/books/:id
 * Delete a book by ID (protected route - requires authentication)
 */
router.delete('/:id', authMiddleware, deleteBook);

module.exports = router;
