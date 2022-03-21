require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const headerAuthorization = req.header("authorization");
  if (!headerAuthorization) {
    const error = new Error("Token missing");
    error.status = 401;
    return next(error);
  }
  const token = headerAuthorization.replace("Bearer ", "");
  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userData.id;
    return next();
  } catch (error) {
    error.status = 401;
    return next(error);
  }
};

module.exports = auth;
