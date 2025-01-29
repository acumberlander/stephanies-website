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

const userSchema = new mongoose.Schema({
  uid: { type: String, default: null },
  oldUid: { type: String, default: null },
  type: { type: String, default: null },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  cart: {
    cart_items: [cartItemSchema],
    total_items: { type: Number, default: 0 },
    subtotal: { type: Number, default: 0 },
  },
  orders: { type: Array, default: [] },
  status: { type: String, default: "idle" },
  error: { type: String, default: null },
});

module.exports = mongoose.model("User", userSchema);
