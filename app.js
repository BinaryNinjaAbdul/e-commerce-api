const express = require("express");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const cartRouter = require("./routes/cartRoutes");

const app = express();

// Global Middleware
// Request limiter
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP. Please try again in an hour!",
});
app.use("/wahidStore", limiter);

// Data size limiter
app.use(express.json({ limit: "10kb" }));

// Data sanitizer
app.use(mongoSanitize());
app.use(xss());

// Prevent url parameters pollution
// app.use(
//   hpp({
//     whitelist: [""],
//   })
// );

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/wahidStore/v1/products", productRouter);
app.use("/wahidStore/v1/users", userRouter);
app.use("/wahidStore/v1/cart", cartRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
