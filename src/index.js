require("./models/User");
require("./models/Tweet");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const notificationRoutes = require("./routes/notificationRoute");
const tweetRoutes = require("./routes/tweetRoute");
const userRoutes = require("./routes/userRoute");
const requireAuth = require("./middlewares/requireAuth");

const app = express();
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
app.use(authRoutes);
app.use(messageRoutes);
app.use(notificationRoutes);
app.use(tweetRoutes);
app.use(userRoutes);

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/twitterdb';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

mongoose.connection.once("connected", () => {
  console.log("Connected to mongo instance");
});



mongoose.connection.on("error", () => {
  console.error("Error connection to mongo", err);
});

app.get("/", (req, res) => {
  res.json("twitter clone api endpoint");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
