require("dotenv").config();
const express = require("express");

const router = express.Router();
const Event = require("../Models/event");
const { getEvent, getUserEvent, auth } = require("../Middleware/utils");

// Get All
router.get("/", async (req, res) => {
  try {
    //Finding all events
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

// Getting User Event
router.get("/user/:user", getUserEvent, (req, res) => {
  res.json(res.event);
});

// Creating one
router.post("/", async (req, res) => {
  //Creating new event
  const event = new Event({
    event_name: req.body.event_name,
    user: req.body.user,
    description: req.body.description,
    date_and_time: req.body.date_and_time,
  });
  try {
    //Saving the created event
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch("/:id", getEvent, async (req, res) => {
  if (req.body.event_name != null) {
    res.event.event_name = req.body.event_name;
  }
  if (req.body.user != null) {
    res.event.user = req.body.user;
  }
  if (req.body.description != null) {
    res.event.description = req.body.description;
  }
  if (req.body.date_and_time != null) {
    res.event.date_and_time = req.body.date_and_time;
  }
  try {
    //Saving the event
    const updatedEvent = await res.event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getEvent, async (req, res) => {
  try {
    //Removing the Event
    await res.event.remove();
    res.json({ message: "Event Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
