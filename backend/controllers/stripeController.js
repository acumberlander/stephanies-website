const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/***************************************** Stripe Checkout Session Controller Requests ********************************************/

const createCheckoutSession = async (req, res) => {
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
      // dynamic_tax_rates: ["txr_1QqzpFGZ9VpDdAnjyMTL3zKV"],
      tax_rates: ["txr_1R9Vjp2f37aim8QKGOFM0Mge"],
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
      mode: "payment",
      ui_mode: "embedded",
      return_url: `${
        // process.env.FRONTEND_URL || "http://localhost:3000"
        "http://localhost:3000"
      }/thank-you?session_id={CHECKOUT_SESSION_ID}`, // Where user lands after payment
    });

    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCheckoutSession = async (req, res) => {
  const { id: sessionId } = req.params;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.send(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCartItems = async (req, res) => {
  const { id: sessionId } = req.params;

  try {
    const { data: lineItems } = await stripe.checkout.sessions.listLineItems(
      sessionId
    );
    res.send(lineItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchAllCheckoutSessions = async (req, res) => {
  try {
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      expand: ["data.line_items"],
    });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/***************************************** Stripe Product Controller Requests ********************************************/

const fetchAllStripeProducts = async (req, res) => {
  try {
    const products = await stripe.products.list({
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
        sizes: product.metadata.sizes ? JSON.parse(product.metadata.sizes) : [],
        active: product.active,
      };
    });

    res.json(productList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchStripeProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await stripe.products.retrieve(id);
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
};

const createStripeProduct = async (req, res) => {
  const { name, description, price, category, sizes, images } = req.body;

  try {
    const product = await stripe.products.create({
      name,
      description,
      images,
      metadata: {
        category,
        sizes: JSON.stringify(sizes || []),
      },
    });

    const priceObj = await stripe.prices.create({
      currency: "usd",
      unit_amount: price,
      product: product.id,
    });

    await stripe.products.update(product.id, {
      default_price: priceObj.id,
    });

    res.json({ product, price: priceObj });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateStripeProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, sizes, images } = req.body;

  try {
    // 1. Get the current product + its default_price expanded
    const currentProduct = await stripe.products.retrieve(id, {
      expand: ["default_price"],
    });

    const existingPriceCents = currentProduct.default_price?.unit_amount;

    // 2. Update the product metadata
    const updatedProduct = await stripe.products.update(id, {
      name,
      description,
      images,
      metadata: {
        category,
        sizes: JSON.stringify(sizes || []),
      },
    });

    let updatedPrice = currentProduct.default_price;

    // 3. If price has changed, create a new one and update default_price
    if (existingPriceCents !== price) {
      updatedPrice = await stripe.prices.create({
        currency: "usd",
        unit_amount: price, // price is already in cents
        product: id,
      });

      await stripe.products.update(id, {
        default_price: updatedPrice.id,
      });

      // (Optional) Deactivate the old price
      if (currentProduct.default_price?.id) {
        await stripe.prices.update(currentProduct.default_price.id, {
          active: false,
        });
      }
    }

    res.json({ ...updatedProduct, price: updatedPrice });
  } catch (err) {
    console.error("Stripe Update Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

const toggleActiveStatus = async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;
  try {
    const product = await stripe.products.update(id, {
      active,
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/***************************************** Stripe Invoice Controller Requests ********************************************/

/**
 * Retrieves a list of invoices.
 */
const fetchAllInvoices = async (req, res) => {
  try {
    const invoices = await stripe.invoices.list({
      limit: 100,
    });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Retrieves the invoice with the given ID.
 */
const fetchInvoiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const invoice = await stripe.invoices.retrieve(id);
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/***************************************** Stripe Payment Intent Controller Requests ********************************************/

const fetchAllStripePaymentIntents = async (req, res) => {
  try {
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 100,
    });
    res.json(paymentIntents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchStripePaymentIntentById = async (req, res) => {
  const { id } = req.params;
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(id);
    res.json(paymentIntent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/***************************************** Stripe Coupon Controller Requests ********************************************/

const createStripeCoupon = async (req, res) => {
  const { name, percent_off, duration } = req.body;
  try {
    const coupon = await stripe.coupons.create({
      name,
      percent_off,
      duration,
    });
    res.json(coupon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchStripeCoupons = async (req, res) => {
  try {
    const coupons = await stripe.coupons.list();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteStripeCoupon = async (req, res) => {
  const { id } = req.params;
  try {
    const coupon = await stripe.coupons.del(id);
    res.json(coupon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editStripeCoupon = async (req, res) => {
  const { id } = req.params;
  const { name, percent_off, duration } = req.body;
  try {
    const coupon = await stripe.coupons.update(id, {
      name,
      percent_off,
      duration,
    });
    res.json(coupon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/***************************************** Stripe Customer Controller Requests ********************************************/

const createStripeCustomer = async (req, res) => {
  const { email, name } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const customer = await stripe.customers.create({
      email,
      name: name || undefined,
    });

    res.json(customer);
  } catch (err) {
    console.error("Error creating Stripe customer:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCheckoutSession,
  getCartItems,
  getCheckoutSession,
  fetchAllCheckoutSessions,
  fetchAllStripeProducts,
  fetchStripeProductById,
  createStripeProduct,
  updateStripeProduct,
  toggleActiveStatus,
  fetchAllStripePaymentIntents,
  fetchStripePaymentIntentById,
  fetchAllInvoices,
  fetchInvoiceById,
  createStripeCoupon,
  fetchStripeCoupons,
  deleteStripeCoupon,
  editStripeCoupon,
  createStripeCustomer,
};
