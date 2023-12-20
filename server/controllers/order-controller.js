const Order = require("../models/order-model");
const User = require("../models/user-model");

const createOrder = async (req, res) => {
  try {
    const { user: userId, orderItems, updatedAt } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const shippingAddress = user.address;
    const order = await Order.create({
      user : userId,
      orderItems,
      shippingAddress,
      updatedAt,
    });
    res.status(200).json(order);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.user = req.body.user || order.user;
      order.orderItems = req.body.orderItems || order.orderItems;
      order.shippingAddress = req.body.shippingAddress || order.shippingAddress;
      order.updatedAt = Date.now();
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ msg: "Order not found" });
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (order) {
      res.status(200).json({ msg: "Order removed" });
    } else {
      res.status(404).json({ msg: "Order not found" });
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
