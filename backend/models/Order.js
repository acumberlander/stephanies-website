const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  quantity: Number,
  subtotal: Number,
});

const orderSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: false },
  sessionId: { type: String, required: true, unique: true },
  items: [orderItemSchema],
  total: { type: Number, required: true, unique: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
