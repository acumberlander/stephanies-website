const Order = require("../models/Order");
const { GROUND_SHIPPING } = require("../../client/src/constants/constants");

const createOrder = async (req, res) => {
  const { uid, sessionId, lineItems, subtotal } = req.body;

  const formattedLineItemsStructure = lineItems.map((item) => {
    return {
      name: item.description,
      id: item.id,
      price: (item.price.unit_amount / 100).toFixed(2),
      quantity: item.quantity.toFixed(0),
      subtotal: (
        (item.price.unit_amount / 100) *
        item.quantity.toFixed(0)
      ).toFixed(2),
    };
  });

  const orderTotal = () => {
    const tax = subtotal * 0.0975;
    return tax + subtotal + GROUND_SHIPPING;
  };

  try {
    const newOrder = new Order({
      uid: uid,
      sessionId: sessionId,
      items: formattedLineItemsStructure,
      total: orderTotal().toFixed(2),
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
