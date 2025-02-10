const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Stripe Webhook endpoint
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    let event;
    let eventType;
    let data;

    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️ Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = request.body.data.object;
      eventType = request.body.type;
    }

    // Handle the event
    switch (eventType) {
      case "checkout.session.completed":
        stripe.customers
          .retrieve(data.customer)
          .then((customer) => {
            console.log(customer);
            console.log("data: ", data);
          })
          .catch((err) => console.log(err.message));

        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

module.exports = router;
