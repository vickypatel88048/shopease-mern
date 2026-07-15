const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
    },

    image: {
      type: String,
      required: [true, "Product image is required"],
    },

    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
    },

    brand: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);