require("dotenv").config();
const express = require("express");

const router = express.Router();
const Event = require("../Models/event");
const { getEvent, auth } = require("../Middleware/utils");

// Get All
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getEvent, (req, res) => {
  res.json(res.event);
});

// Creating one
router.post("/", async (req, res) => {
  const event = new Event({
    event_name: req.body.event_name,
    user: req.body.user,
    description: req.body.description,
    date_and_time: req.body.date_and_time,
  });
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
