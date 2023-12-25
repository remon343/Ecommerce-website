const jwt = require("jsonwebtoken"); // npm i jsonwebtoken
const authenticateToken = (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) {
        throw new Error("Token not found");
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          throw new Error("Invalid Token");
        }
        req.user = user;
        next();
      });
    } catch (err) {
      next(err);
    }
  };

  module.exports = authenticateToken;