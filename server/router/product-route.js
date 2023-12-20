const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/product-controller');

router.route("/add").post(productControllers.addProduct);

router.route("/products").get(productControllers.getProducts);

router.route('/product/:id').get(productControllers.getProductById);

router.route('/update/:id').put(productControllers.updateProduct);

router.route('/delete/:id').delete(productControllers.deleteProduct);

module.exports = router;
