const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require(".././models/UserSchema");

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
  } catch (error) {
    console.log("Registration error", error);
  }
};

exports.login = async (req, res) => {
  try {
    res.send("Hello this is the register");
  } catch (error) {
    console.log("Login error", error);
  }
};
