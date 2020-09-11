const User = require("../Models/user");
const Event = require("../Models/event");
const jwt = require("jsonwebtoken");

//Middle for One user
const getUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find User" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
};

const getEvent = async (req, res, next) => {
  let event;
  try {
    event = await Event.findById(req.params.id);
    if (event == null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.event = event;
  next();
};

const generateToken = (item) => {
  const user = {
    id: item.id,
    name: item.name,
    email: item.email,
  };
  return new Promise((resolve, reject) => {
    jwt.sign(
      user,
      process.env.SECRET_KEY,
      { expiresIn: "30 days" },
      (err, newToken) => {
        if (newToken) {
          resolve(newToken);
        }
        if (err) {
          reject(err);
        }
      }
    );
  });
};

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    res.status(401).json({ message: "Authorization failed!" });
  }
};

module.exports = {
  getUser,
  generateToken,
  auth,
  getEvent,
};
