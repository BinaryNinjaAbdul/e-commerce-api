const express = require("express");
const productController = require("./../controller/productController");
const authController = require("./../controller/authController");

const router = express.Router();

router
  .route("/top-10-cheap")
  .get(productController.aliasTopProducts, productController.getAllProduct);

router
  .route("/")
  .get(productController.getAllProduct)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    productController.createProduct
  );

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    productController.updateProduct
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    productController.deleteProduct
  );

module.exports = router;
