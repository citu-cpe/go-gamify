const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");
const gamifyRoutes = require("./routes/gamifyRoutes");

const app = express();
console.log("App running...");
console.log("Connecting to database...");

// connect to mongodb
const dbURI =
  "mongodb+srv://node-user-01:NodeUser001-@cluster0.afth4.mongodb.net/noice-node?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("Connected to db");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log("%c Server running", "color: green");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// register view engine
app.set("view engine", "ejs");

// morgan is a middleware that simplifies logging processes
app.use(morgan("dev"));

// middleware static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.get("/", (req, res) => {
  console.log("redirect");
  res.render("home", { title: "Gamify" });
});

app.get("/gamify", (req, res) => {
  res.render("gamify/index", { title: "Gamify" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);
app.use("/gamify", gamifyRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "Page not found." });
});
