const express = require("express");
const dotenv = require("dotenv");
const authRouter = require("./router/auth-route");
const userRouter = require("./router/user-route");
const productRouter = require("./router/product-route");
const orderRouter = require("./router/order-route");
const cartRouter = require("./router/cart-route");
const connectDB = require("./utils/db");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter)

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

connectDB().then(() => {
  const port = process.env.PORT;
  const hostname = process.env.HOSTNAME;
  app.listen(port, hostname, () => {
    console.log(`Server is running at port ${port}`);
  });
});
