const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Cart = require("./../model/cartModel");

exports.getCart = catchAsync(async (req, res) => {
  const userId = req.user._id;
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    // If there is no cart for the user, create a new one
    cart = new Cart({ userId, products: [] });
  }
  await cart.save();
  res.status(200).json({ cartItems: cart.products });
});

exports.addToCart = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.id;
  const { quantity } = req.body;
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    // If there is no cart for the user, create a new one
    cart = new Cart({ userId, products: [] });
  }

  // Check if the product is already in the cart
  const productIndex = cart.products.findIndex(
    (product) => product.productId.toString() === productId
  );

  if (productIndex !== -1) {
    // If the product is already in the cart, increase the quantity
    cart.products[productIndex].quantity = quantity;
  } else {
    // If the product is not in the cart, add it
    cart.products.push({ productId, quantity });
  }

  const updatedCart = await cart.save();
  res
    .status(200)
    .json({ message: "Item added to the cart", cart: updatedCart });
});

exports.removeFromCart = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.id;
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return next(
      new AppError("Error while removing product. Please try again later")
    );
  }

  const productIndex = cart.products.findIndex(
    (product) => product.productId.toString() === productId
  );

  if (productIndex !== -1) {
    cart.products.splice(productIndex, 1);
    const updatedCart = await cart.save();
    res
      .status(200)
      .json({
        message: "Item removed from the cart",
        cart: updatedCart.products,
      });
  } else {
    res.status(404).json({ error: "Product not found in the cart" });
  }
});
