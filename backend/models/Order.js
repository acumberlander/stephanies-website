const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  id: String,
  quantity: Number,
  total: Number,
});

const orderSchema = new mongoose.Schema({
  uid: { type: String, required: false, unique: false },
  sessionId: { type: String, required: true, unique: true },
  cart_items: [orderItemSchema],
  total: { type: Number, required: true, unique: false },
});

module.exports = mongoose.model("Order", orderSchema);
