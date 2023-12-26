const jwt = require("jsonwebtoken"); // npm i jsonwebtoken
const dotenv = require("dotenv"); // npm i dotenv
const User = require("../models/user-model");
dotenv.config();
const authenticateToken = async (req, res, next) => {
    try {
      const authHeader = req.headers(authorization);
      const token = authHeader.split(" ")[1];
      if (!token) {
        throw new Error("Token not found");
      }
      const isVerified = jwt.verify(token, process.env.JWT_SECRET);
      if(!isVerified){
          throw new Error("Token verification failed");
      }
      const userData = await User.findOne({email : isVerified.email}).select("-password");
      req.user = userData;
      req.token = token;
      req.userId = isVerified._id.toString();
      next();
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };

  module.exports = authenticateToken;