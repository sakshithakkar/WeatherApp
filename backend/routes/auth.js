const express = require("express")
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const dotenv = require('dotenv');
dotenv.config();

// const router = express.Router();
// const JWT_SECRET = "supersecretkey123"; // move to .env later

// Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const hash = await bcrypt.hash(password, 10);
  await User.create({ email, password: hash });

  return res.json({ message: "User registered successfully" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id, email }, process.env.JWT_SECRET, {
    expiresIn: "24h"
  });

  return res.json({ token, email });
});

module.exports = router; 
