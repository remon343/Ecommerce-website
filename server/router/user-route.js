const express = require('express');
const router = express.Router();
const userControllers = require("../controllers/user-controller");

router.route('/users').get(userControllers.getUsers);

router.route('/user/:id').get(userControllers.getUserById); 
router.route('/update/:id').put(userControllers.updateUser);

router.route('/delete/:id').delete(userControllers.deleteUser);

module.exports = router;