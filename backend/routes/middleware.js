const express = require("express");
const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");
const app = express();

const authMiddleWare = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ msg: "incorrect auth" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (err) {
    return res.status(403).json({ error: err });
  }
};
module.exports = {
  authMiddleWare,
};
