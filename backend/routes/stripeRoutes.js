const express = require("express");
const router = express.Router();
const stripeController = require("../controllers/stripeController");

/***************************************** Stripe Checkout Session Routes ************************************/

// Creates an Embedded Checkout Session
router.post("/create-checkout-session", stripeController.createCheckoutSession);

// Get cart items from a specific order session
router.get("/sessions/:id/line_items", stripeController.getCartItems);

// Get checkout session object by the sessionId in the request param
router.get("/session/:id", stripeController.getCheckoutSession);


/***************************************** Stripe Product Routes ********************************************/

// GET all products from Stripe
router.get("/products", stripeController.fetchStripeProducts);

// GET a single product from Stripe
router.get("/product/:id", stripeController.fetchStripeProductById);


module.exports = router;
