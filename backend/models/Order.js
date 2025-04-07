const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  price_id: String,
  category: String,
  sizes: [String],
  selected_size: String || null,
  active: Boolean,
  description: String,
  quantity: Number,
  subtotal: Number,
  images: [String],
});

const orderSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: false },
  payment_intent: { type: String, required: true, unique: true },
  items: [orderItemSchema],
  total: { type: Number, required: true, unique: false },
  created: { type: Date, default: Date.now },
  subtotal: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  shipping: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  newMember: { type: Boolean, default: false },
});

module.exports = mongoose.model("Order", orderSchema);
