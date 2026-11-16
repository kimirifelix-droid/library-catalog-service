const mongoose = require('mongoose');

function isValidIsbn13(value) {
  if (!/^(978|979)\d{10}$/.test(value)) {
    return false;
  }

  const checksum = Array.from(value.slice(0, 12)).reduce(
    (sum, digit, index) => sum + Number(digit) * (index % 2 === 0 ? 1 : 3),
    0
  );

  return (10 - (checksum % 10)) % 10 === Number(value[12]);
}

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: isValidIsbn13,
        message: 'ISBN must be a valid ISBN-13 number.',
      },
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    coverImage: {
      type: String,
      required: true,
      trim: true,
      match: /^https?:\/\/\S+$/,
    },
    totalCopies: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: 'totalCopies must be a whole number.',
      },
    },
    availableCopies: {
      type: Number,
      required: true,
      min: 0,
      validate: [
        {
          validator: Number.isInteger,
          message: 'availableCopies must be a whole number.',
        },
        {
          validator: function (value) {
            return value <= this.totalCopies;
          },
          message: 'availableCopies cannot exceed totalCopies.',
        },
      ],
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genre',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
