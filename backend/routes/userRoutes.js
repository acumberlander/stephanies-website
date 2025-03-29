const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// GET user by uid
router.get("/:uid", usersController.fetchUserByUid);

// GET user by _id
router.get("/:_id", usersController.fetchUserById);

// POST create user
router.post("/", usersController.createUser);

// PUT add to cart
router.put("/:uid/cart", usersController.updateUserCart);

// PUT add an order
router.put("/:uid/orders", usersController.updateUserOrders);

module.exports = router;
