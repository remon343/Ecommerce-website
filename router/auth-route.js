const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, path.join(__dirname,'../public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
}).single("profileImage");

router.route("/").get(authControllers.home);

router.route("/register").post(upload, authControllers.register);

router.route("/login").post(authControllers.login);

module.exports = router;
