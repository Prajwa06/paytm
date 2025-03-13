require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWTsecret;


const authMiddleware = async (request, response, next) => {
  const authHeader = request.headers.authorization;


  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    response.status(403).json({
      message: "Invalid authorisation, Please login",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret);
    if (decoded.userId) {
      request.userId = decoded.userId;
      next();
    } else {
      response.status(403).json({
        message: "Invalid authorisation, Please login",
      });
      return;
    }
  } catch (error) {
    console.log(error);
    response.status(403).json({
      message: "Invalid authorisation, Please login",
    });
    return;
  }
};

module.exports = authMiddleware;
