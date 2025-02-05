const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a Payment Intent
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { items } = req.body;

    console.log("items: ", items);

    // Calculate total amount
    const totalAmount =
      items.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
