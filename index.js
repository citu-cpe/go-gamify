const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");
const gamifyRoutes = require("./routes/gamifyRoutes");

const app = express();
console.log("App running...");

const PORT = process.env.PORT || 3000;

require("dns").resolve("www.google.com", function (err) {
  console.log("Checking Internet connectivity...");
  if (err) {
    console.log("No connection");
    listen();
  } else {
    console.log("Connecting to database...");
    // connect to mongoDB
    const dbURI =
      "mongodb+srv://node-user-01:NodeUser001-@cluster0.afth4.mongodb.net/goGamifyDB?retryWrites=true&w=majority";
    mongoose
      .connect(dbURI)
      .then((result) => {
        console.log("Connected to database...");
        listen();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

const listen = () => {
  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`App is listening on port ${PORT}.`);
  });
};

app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.get("/", (req, res) => {
  res.render("home", { title: "Gamify" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);
app.use("/gamify", gamifyRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "Page not found." });
});
