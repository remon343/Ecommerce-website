const cartController = require("../controllers/cart-controller");
const express = require("express");
const router = express.Router();

router.route("/addcart").post(cartController.createCart);
router.route("/getcarts").get(cartController.getCarts);
router.route("/getcart/:id").get(cartController.getCartById);
router.route("/updatecart/:id").put(cartController.updateCart);
router.route("/deletecart/:id").put(cartController.deleteCart);

module.exports = router;