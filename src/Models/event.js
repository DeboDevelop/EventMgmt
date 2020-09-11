const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  event_name: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  date_and_time: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);
