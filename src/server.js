require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./Routes/users");

const app = express();

//Connection to Database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// setting up the server for req with json body
app.use(express.json());

// Setting up the routes
app.use("/api/users", usersRouter);

//Creating port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`The Server is running on http://localhost:${PORT}`)
);
