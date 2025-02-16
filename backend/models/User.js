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
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  cart: {
    cart_items: [cartItemSchema],
    total_items: { type: Number, default: 0 },
    subtotal: { type: Number, default: 0 },
  },
  isAuthenticated: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  status: { type: String, default: "idle" },
  error: { type: String, default: null },
});

module.exports = mongoose.model("User", userSchema);
