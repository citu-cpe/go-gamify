const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");
const gamifyRoutes = require("./routes/gamifyRoutes");

const app = express();
console.log("App running...");
console.log("Connecting to database...");
const PORT = process.env.PORT || 3000;

// connect to mongodb
// const dbURI =
//   "mongodb+srv://node-user-01:NodeUser001-@cluster0.afth4.mongodb.net/noice-node?retryWrites=true&w=majority";
// mongoose
//   .connect(dbURI)
//   .then((result) => {
//     console.log("Connected to database...");

//     app.listen(PORT, (err) => {
//       if (err) throw err;
//       console.log(`App is listening on port ${PORT}.`);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`App is listening on port ${PORT}.`);
});

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
