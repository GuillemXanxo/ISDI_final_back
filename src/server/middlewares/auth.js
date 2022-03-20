require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const headerAuthorization = req.header("authorization");
  if (!headerAuthorization) {
    const error = new Error("Token missing");
    res.status = 401;
    return next(error);
  }
  const token = headerAuthorization.replace("Bearer ", "");
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    res.status = 401;
    return next(error);
  }
};

module.exports = auth;
