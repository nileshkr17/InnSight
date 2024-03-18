const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticateUser = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).send("Unauthorized: Authorization header missing");
    }

    const token = authorizationHeader;

    if (!token) {
      return res.status(401).send("Unauthorized: Token missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).send("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send(error.message);
  }
};

module.exports = authenticateUser;
