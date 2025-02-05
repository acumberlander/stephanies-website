const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// GET all products from Stripe
router.get("/", async (req, res) => {
  try {
    const products = await stripe.products.list({ active: true });
    const prices = await stripe.prices.list({ active: true });

    // Map products to include price information
    const productList = products.data.map((product) => {
      const price = prices.data.find((p) => p.product === product.id);
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: price ? price.unit_amount / 100 : null, // Convert from cents
        price_id: price ? price.id : null, // Needed for checkout
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
router.get("/:id", async (req, res) => {
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

module.exports = router;
