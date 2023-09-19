const express = require("express");
const bodyParser = require("body-parser");
const nunjucks = require("nunjucks");
const path = require('path');

const cors = require("cors");
const connectDB = require("./db");
const app = express();
require("dotenv").config();

const cookieParser = require("cookie-parser");

const PORT = 5000;

app.set("view engine", "ejs");

//DB Connection
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
nunjucks.configure("views", { express: app });

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", require("./routes/route"));

app.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" });
  res.redirect("/");
});

app.use(express.static('../client/build'));
// let the react app to handle any unknown routes 
// serve up the index.html if express does'nt recognize the route
app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);

// Handling Error
process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
