const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./Route/Routing");
require ("dotenv").config();

mongoose.connect('mongodb+srv://rajshreya2006:shreyaSingh@cluster0.p2qderp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Database connection established!");
});

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use router at root level ("/"), so "/register" works directly
app.use("/", router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to my Node.js & MongoDB app!");
});
