const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const validate = require("../middlewares/validate-middleware");
const registerSchema = require("../validators/register-auth-validate");
const loginSchema = require("../validators/login-auth-validate");
const upload = require("../middlewares/upload-middleware");
const authenticateToken = require("../middlewares/authenticatetoken-middleware");

router.route("/").get(authControllers.home);
router
  .route("/register")
  .post(upload, validate(registerSchema), authControllers.register);
router.route("/login").post(validate(loginSchema), authControllers.login);
router.route("/user").get(authenticateToken, authControllers.user);

module.exports = router;
