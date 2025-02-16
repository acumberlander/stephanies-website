const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/***************************************** Stripe Checkout Session Routes ************************************/

// Creates an Embedded Checkout Session
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
      dynamic_tax_rates: ["txr_1QqzpFGZ9VpDdAnjyMTL3zKV"],
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      invoice_creation: { enabled: true },
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
        process.env.FRONTEND_URL || "http://localhost:3000"
      }/thank-you?session_id={CHECKOUT_SESSION_ID}`, // Where user lands after payment
    });

    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get cart items from a specific order session
router.get("/sessions/:id/line_items", async (req, res) => {
  const { id: sessionId } = req.params;

  try {
    const { data: lineItems } = await stripe.checkout.sessions.listLineItems(
      sessionId
    );
    res.send(lineItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get checkout session object by the sessionId in the request param
router.get("/session/:id", async (req, res) => {
  const { id: sessionId } = req.params;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.send({
      ...session,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
/************************************************************************************************************/
/***************************************** Stripe Product Routes ********************************************/

// GET all products from Stripe
router.get("/products", async (req, res) => {
  try {
    const products = await stripe.products.list({
      active: true,
      expand: ["data.default_price"],
    });

    // Map products to include price information
    const productList = products.data.map((product) => {
      const price = product.default_price;
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: price.unit_amount ? price.unit_amount / 100 : null, // Convert from cents
        price_id: price.id ? price.id : null, // Needed for checkout
        images: product.images,
        category: product.metadata.category || "Uncategorized",
        sizes: product.metadata.sizes ? product.metadata.sizes.split(",") : [],
      };
    });

    res.json(productList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single product from Stripe
router.get("/product/:id", async (req, res) => {
  try {
    const product = await stripe.products.retrieve(req.params.id);
    const prices = await stripe.prices.list({
      product: product.id,
      active: true,
    });

    res.json({
      id: product.id,
      name: product.name,
      description: product.description,
      price: prices.data.length ? prices.data[0].unit_amount / 100 : null,
      price_id: prices.data.length ? prices.data[0].id : null,
      images: product.images,
      category: product.metadata.category || "Uncategorized",
      sizes: product.metadata.sizes ? product.metadata.sizes.split(",") : [],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/************************************************************************************************************/

module.exports = router;
