const Order = require("../models/Order");

const createOrder = async (req, res) => {
  const { uid, payment_intent, lineItems, subtotal, tax, shipping, discount, total, created } = req.body;

  try {
    const newOrder = new Order({
      uid: uid,
      payment_intent: payment_intent,
      items: lineItems,
      subtotal: subtotal,
      tax: tax,
      shipping: shipping,
      discount: discount,
      total: total,
      created: created,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchOrdersByUid = async (req, res) => {
  const { uid } = req.params;
  try {
    const orders = await Order.find({ uid });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  fetchOrdersByUid,
};
