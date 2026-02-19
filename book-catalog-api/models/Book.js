/**
 * Book Schema
 * Defines the structure for book documents in MongoDB
 */

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a book title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    author: {
      type: String,
      required: [true, 'Please provide an author name'],
      trim: true,
      maxlength: [50, 'Author name cannot exceed 50 characters'],
    },
    genre: {
      type: String,
      required: [true, 'Please provide a genre'],
      enum: [
        'Fiction',
        'Non-Fiction',
        'Mystery',
        'Romance',
        'Science Fiction',
        'Fantasy',
        'Biography',
        'History',
        'Self-Help',
        'Educational',
      ],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
