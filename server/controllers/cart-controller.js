const Cart = require("../models/cart-model");
const User = require("../models/user-model");

const createCart = async (req, res) => {
  try {
    const { user : userId, cartItems } = req.body;
    const cart = await Cart.create({
      user : userId,
      cartItems,
    });
    res.status(200).json(cart);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

const getCarts = async (req, res) => {
  try {
    const carts = await Card.find({});
    res.status(200).json(carts);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ msg: "Cart not found" });
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (cart) {
      cart.user = req.body.user || cart.user;
      cart.cartItems = req.body.cartItems || cart.cartItems;
      const updatedCart = await cart.save();
      res.status(200).json(updatedCart);
    } else {
      res.status(404).json({ msg: "Cart not found" });
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (cart) {
      res.status(200).json({ msg: "Cart removed" });
    } else {
      res.status(404).json({ msg: "Cart not found" });
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

module.exports = {
  createCart,
  getCarts,
  getCartById,
  updateCart,
  deleteCart,
};
