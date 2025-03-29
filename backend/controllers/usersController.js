const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { uid, email, firstName, lastName, cart, orders } = req.body;

    if (!uid) {
      return res.status(400).json({ error: "UID is required" });
    }
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const newUser = new User({
      uid,
      email,
      firstName: firstName || "Guest",
      lastName: lastName || "",
      cart: cart || { cart_items: [], total_items: 0, subtotal: 0 },
      orders: orders || [],
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchUserByUid = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params._id });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUserCart = async (req, res) => {
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
};

const updateUserOrders = async (req, res) => {
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
};

module.exports = {
  createUser,
  fetchUserByUid,
  fetchUserById,
  updateUserCart,
  updateUserOrders,
};
