const Product = require("../model/productModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.aliasTopProducts = (req, res, next) => {
  req.query.limit = "10";
  req.query.sort = "-ratingsAverage, price";
  req.query.fields = "name,price,ratingsAverage,summary";
  next();
};

exports.getAllProduct = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limit()
    .paginate();
  const allProduct = await features.query;

  res.status(201).json({
    status: "successs",
    totalProduct: allProduct.length,
    data: {
      allProduct,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(201).json({
    status: "successs",
    data: {
      product,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  res.status(201).json({
    status: "successs",
    data: {
      product: newProduct,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedProduct) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(201).json({
    status: "successs",
    data: {
      product: updatedProduct,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(201).json({
    status: "successs",
    data: {
      product: null,
    },
  });
});
