const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/ordersController");

// Creates Order in mongoDB
router.post("/", ordersController.createOrder);

// Get orders by uid
router.get("/:uid", ordersController.fetchOrdersByUid);

module.exports = router;
