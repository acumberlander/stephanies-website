const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const { GROUND_SHIPPING } = require("../../client/src/constants/constants");

// Creates Order in mongoDB
router.post("/", async (req, res) => {
  const { uid, sessionId, lineItems, subtotal } = req.body;

  const formattedLineItemsStructure = lineItems.map((item) => {
    return {
      name: item.description,
      id: item.id,
      price: item.price.unit_amount,
      total: item.amount_total,
      quantity: item.quantity,
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
      cart_items: formattedLineItemsStructure,
      total: orderTotal(),
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);

    res.send({ savedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
