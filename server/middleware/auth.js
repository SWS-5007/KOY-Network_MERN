require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_Secret;

exports.adminAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        if (decodedToken.role !== "admin") {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

exports.userAuth = (req, res, next) => {
  const token = req.cookies.login_jwt;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(405).json({ message: "Expired Token!" });
      } else {
        console.log("Login_JWT_Token is available");
        req.userInfo = decodedToken;
        next();
      }
    });
  } else {
    console.log("No Login_JWT_Token!");
    return res.status(405).json({ message: "No Login_JWT_Token!" });
  }
};
