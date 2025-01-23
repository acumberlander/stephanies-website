const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET user by uid
router.get("/:uid", async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET user by _id
router.get("/:_id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params._id });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create user
router.post("/", async (req, res) => {
  try {
    const { uid, isGuest, cart, orders } = req.body;

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
      isGuest: isGuest || true,
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

// PUT update user cart
router.put("/:uid/cart", async (req, res) => {
  try {
    // e.g. { cart_items, total_items, subtotal }
    const updateData = req.body;
    const user = await User.findOneAndUpdate(
      { uid: req.params.uid },
      {
        $set: {
          "cart.cart_items": updateData.cart_items,
          "cart.total_items": updateData.total_items,
          "cart.subtotal": updateData.subtotal,
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

// PUT add an order
router.put("/:uid/orders", async (req, res) => {
  try {
    const { order } = req.body;
    const user = await User.findOneAndUpdate(
      { uid: req.params.uid },
      { $push: { orders: order } },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
