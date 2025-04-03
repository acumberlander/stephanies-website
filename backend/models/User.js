const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    default: "Guest",
  },
  lastName: {
    type: String,
    default: "",
  },
  stripeCustomerId: {
    type: String,
    default: null,
  },
  cart: {
    cart_items: {
      type: Array,
      default: [],
    },
    total_items: {
      type: Number,
      default: 0,
    },
    subtotal: {
      type: Number,
      default: 0,
    },
  },
  orders: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("User", UserSchema);
