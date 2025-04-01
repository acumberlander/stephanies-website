require("dotenv").config();
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
router.get("/products", stripeController.fetchAllStripeProducts);

// GET a single product from Stripe
router.get("/product/:id", stripeController.fetchStripeProductById);

// POST a new product to Stripe
router.post("/products", stripeController.createStripeProduct);

// PUT update a product in Stripe
router.put("/product/:id", stripeController.updateStripeProduct);

// PUT set a product to active or inactive in Stripe (archive/unarchive)
router.put("/product/:id/status", stripeController.toggleActiveStatus);

// DELETE a product from Stripe
router.delete("/product/:id", stripeController.deleteStripeProduct);


/***************************************** Stripe Coupon Routes ********************************************/

// POST a new coupon to Stripe
router.post("/coupons", stripeController.createStripeCoupon);

// GET all coupons from Stripe
router.get("/coupons", stripeController.fetchStripeCoupons);

// DELETE a coupon from Stripe
router.delete("/coupons/:id", stripeController.deleteStripeCoupon);

// PUT update a coupon in Stripe
router.put("/coupons/:id", stripeController.editStripeCoupon);


module.exports = router;
