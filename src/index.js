require("./models/User");
require("./models/Tweet");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const notificationRoutes = require("./routes/notificationRoute");
const tweetRoutes = require("./routes/tweetRoute");
const userRoutes = require("./routes/userRoute");
const requireAuth = require("./middlewares/requireAuth");

const cors = require("cors");
var whitelist = ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:8000', 'https://birthday-app-fullstack.herokuapp.com', 'https://colmig-app.herokuapp.com'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
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
