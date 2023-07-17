const express = require("express");
const authController = require("./../controller/authController");
const cartController = require("./../controller/cartController");

const router = express.Router();

router.get("/", authController.protect, cartController.getCart);

router.post(
  "/add-to-cart/:id",
  authController.protect,
  cartController.addToCart
);
router.patch(
  "/update-on-cart/:id",
  authController.protect,
  cartController.addToCart
);
router.delete(
  "/remove-from-cart/:id",
  authController.protect,
  cartController.removeFromCart
);

module.exports = router;
