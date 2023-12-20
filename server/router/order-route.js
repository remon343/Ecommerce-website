const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controller');

router.route("/add").post(orderController.createOrder);
router.route("/orders").get(orderController.getOrders);
router.route("/order/:id").get(orderController.getOrderById);
router.route("/update/:id").put(orderController.updateOrder);
router.route("/delete/:id").delete(orderController.deleteOrder);

module.exports = router;