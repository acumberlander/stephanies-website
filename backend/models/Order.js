const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  id: String,
  images: [String],
  option_groups: {
    sizes: [String],
  },
  selected_size: String,
  quantity: Number,
});

const orderSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  cart_items: [cartItemSchema],
});

module.exports = mongoose.model("Order", orderSchema);
