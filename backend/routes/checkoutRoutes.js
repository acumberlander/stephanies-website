const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.static("public"));

// Create an Embedded Checkout Session
router.post("/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;

  try {
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.images,
          description: item.description,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      customer: customer.id,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 500,
              currency: "usd",
            },
            display_name: "Ground shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
      ],
      // automatic_tax: {
      //   enabled: true,
      // },
      mode: "payment",
      ui_mode: "embedded",
      return_url: `${
        process.env.CLIENT_URL || "http://localhost:3000"
      }/thank-you?session_id={CHECKOUT_SESSION_ID}`, // Where user lands after payment
    });

    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
