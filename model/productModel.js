const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A product must have a name"],
    trim: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A product must have a price"],
  },
  availability: {
    type: Number,
    required: [true, "A product must have available quantity"],
  },
  type: {
    type: String,
    required: [true, "You must declared product type"],
    trim: true,
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  imageCover: {
    type: String,
    required: [true, "A product must have a cover image"],
  },
  images: [
    {
      type: String,
    },
  ],
});

const Product = mongoose.model("Products", productSchema);

module.exports = Product;
