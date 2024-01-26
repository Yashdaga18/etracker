const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Router = require("./routers");
dotenv.config({ path: "./config.env" });
const app = express();

const dbURI = 'mongodb+srv://yashdagasit22:zqwEugdo0EirzJnP@cluster0.twosv3b.mongodb.net/Etracker';
const port = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(Router);
mongoose
  .connect(dbURI)
  .then((result) => {
    mongoose.set('strictQuery', false);
    app.listen(port);
    console.log("connected to mongodb and listening at port 5000");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
