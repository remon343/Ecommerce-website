const express = require("express");
const dotenv = require("dotenv");
const authRouter = require("./router/auth-route");
const userRouter = require("./router/user-route");
const productRouter = require("./router/product-route");
const orderRouter = require("./router/order-route");
const cartRouter = require("./router/cart-route");
const connectDB = require("./utils/db");
const cors = require("cors");

dotenv.config();
const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);

connectDB().then(() => {
  const port = process.env.PORT;
  const hostname = process.env.HOSTNAME;
  app.listen(port, hostname, () => {
    console.log(`Server is running at port ${port}`);
  });
});
