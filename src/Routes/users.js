require("dotenv").config();
const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../Models/user");
const { getUser, generateToken, auth } = require("../Middleware/utils");

//Get all
router.get("/", auth, async (req, res) => {
  try {
    //Finding all the Users
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", auth, getUser, (req, res) => {
  res.json(res.user);
});

//login
router.post("/login", async (req, res) => {
  try {
    //Checking if the email already exist or not.
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "The given email is invalid" });
    } else {
      //Checking if the password is correct or not using bcrypt
      const isPasswordMatch = await bcryptjs.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordMatch) {
        return res
          .status(404)
          .json({ message: "The given passward is invalid" });
      } else {
        //Creating a user object without password before jwt tokenization.
        //As a result the token won't contain password making it more secure.
        let tempUser = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        //Creating the token.
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
    //Finding whether user already exist or not.
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "Email Already Exist" });
    }
    //Checking if the password match or not
    if (req.body.password != req.body.password2) {
      return res.status(400).json({ message: "Password Doesn't Match" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
  //Creating the new user object
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
        //Saving the user
        const newUser = await user.save();
        //Creating a user object without password before jwt tokenization.
        //As a result the token won't contain password making it more secure.
        const tempUser = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        };
        //Creating the token.
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

//update one
router.patch("/:id", auth, getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }

  try {
    //Saving the updated user object
    const updatedUser = await res.user.save();
    //Creating a updated token from the updated user data
    const token = await generateToken(updatedUser);
    return res.json({ token });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

//delete one
router.delete("/:id", auth, getUser, async (req, res) => {
  try {
    //Deleting the user
    await res.user.remove();
    res.json({ message: "User Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
