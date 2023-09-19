const Mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_LINK = process.env.MONGODB_LINK;

// Connect to MongoDB
const connectDB = async () => {
  await Mongoose.connect(MONGODB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("MongoDB Connected Success!");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

module.exports = connectDB;
