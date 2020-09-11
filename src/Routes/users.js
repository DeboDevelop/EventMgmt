require("dotenv").config();
const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../Models/user");

//Get all
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "The given email is invalid" });
    } else {
      const isPasswordMatch = await bcryptjs.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordMatch) {
        return res
          .status(404)
          .json({ message: "The given passward is invalid" });
      } else {
        let tempUser = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        jwt.sign(
          { ...tempUser },
          process.env.SECRET_KEY,
          { expiresIn: "30 days" },
          (err, token) => {
            return res.status(200).json({
              token,
            });
          }
        );
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//post one
//Register
router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "Email Already Exist" });
    }
    if (req.body.password != req.body.password2) {
      return res.status(400).json({ message: "Password Doesn't Match" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // generating the salt for hash
  bcryptjs.genSalt(10, async (error, salt) => {
    if (error) {
      return res.status(500).json({ error });
    }
    try {
      // hashing the password with the salt
      const hashedPassword = await bcryptjs.hash(user.password, salt);
      user.password = hashedPassword;

      try {
        const newUser = await user.save();
        const tempUser = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        };
        jwt.sign(
          { ...tempUser },
          process.env.SECRET_KEY,
          { expiresIn: "30 days" },
          (err, token) => {
            return res.status(201).json({
              token,
            });
          }
        );
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
});

module.exports = router;
