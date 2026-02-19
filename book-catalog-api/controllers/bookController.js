/**
 * Book Controller
 * Handles all book-related operations (CRUD)
 */

const Book = require('../models/Book');

/**
 * Get all books
 * GET /api/books
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching books',
    });
  }
};

/**
 * Get a single book by ID
 * GET /api/books/:id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find book by ID
    const book = await Book.findById(id);

    // Check if book exists
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: book,
    });
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching book',
    });
  }
};

/**
 * Create a new book
 * POST /api/books
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, price, inStock } = req.body;

    // Validate required fields
    if (!title || !author || !genre || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, author, genre, and price',
      });
    }

    // Create new book
    const book = await Book.create({
      title,
      author,
      genre,
      price,
      inStock: inStock !== undefined ? inStock : true,
    });

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book,
    });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating book',
    });
  }
};

/**
 * Update a book by ID
 * PUT /api/books/:id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, price, inStock } = req.body;

    // Check if book exists
    let book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    // Update book fields
    if (title) book.title = title;
    if (author) book.author = author;
    if (genre) book.genre = genre;
    if (price !== undefined) book.price = price;
    if (inStock !== undefined) book.inStock = inStock;

    // Save updated book
    book = await book.save();

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: book,
    });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating book',
    });
  }
};

/**
 * Delete a book by ID
 * DELETE /api/books/:id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete book
    const book = await Book.findByIdAndDelete(id);

    // Check if book exists
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: book,
    });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting book',
    });
  }
};
