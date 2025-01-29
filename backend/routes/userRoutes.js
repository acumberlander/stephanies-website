const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET - user by uid
router.get("/:uid", async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - user by _id
router.get("/:_id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params._id });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - create user
router.post("/", async (req, res) => {
  try {
    const { uid, type, cart, orders } = req.body;

    if (!uid) {
      return res.status(400).json({ error: "UID is required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const newUser = new User({
      uid,
      type: type.guest,
      cart: cart || { cart_items: [], total_items: 0, subtotal: 0 },
      orders: orders || [],
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT - update user by UID
router.put("/users/:uid", async (req, res) => {
  const { uid } = req.params; // Get the user ID from the route parameter
  const updateData = req.body; // Data to update the user

  try {
    // Find user by UID and update
    const updatedUser = await User.findOneAndUpdate(
      { uid }, // Find user by UID
      { $set: updateData }, // Update with new data
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser); // Respond with the updated user
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT - add to cart
router.put("/:uid/cart", async (req, res) => {
  try {
    const { cart_items, total_items, subtotal } = req.body;
    const user = await User.findOneAndUpdate(
      { uid: req.params.uid },
      {
        $set: {
          "cart.cart_items": cart_items,
          "cart.total_items": total_items,
          "cart.subtotal": subtotal,
        },
      },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - add an order
router.put("/:uid/orders", async (req, res) => {
  try {
    const { orderData } = req.body;

    // Validate order data
    if (!orderData || typeof orderData !== "object") {
      return res.status(400).json({ error: "Invalid order data" });
    }

    // Add new order to the 'orders' array and clear the cart in one query
    const user = await User.findOneAndUpdate(
      { uid: req.params.uid },
      {
        $push: { orders: orderData },
        $set: {
          "cart.cart_items": [],
          "cart.total_items": 0,
          "cart.subtotal": 0,
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user); // Return updated user document with new order + cleared cart
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
