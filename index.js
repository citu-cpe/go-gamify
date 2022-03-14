const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const mammoth = require("mammoth");

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
//     console.log("Connected to db");

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

// TODO refactor mammoth module to gamify
const options = {
  // reserve  H1 for specific page titles for semantic meaning
  styleMap: ["p[style-name='Heading 1'] => h2:fresh"],
  styleMap: ["p[style-name='Heading 2'] => h3:fresh"],
  styleMap: ["p[style-name='Heading 3'] => h4:fresh"],
  styleMap: ["p[style-name='Heading 4'] => h5:fresh"],
  styleMap: ["p[style-name='Heading 5'] => h6:fresh"],
  styleMap: ["p[style-name='Heading 6'] => p:fresh"],
};

app.get("/get-html", (req, res) => {
  mammoth
    .convertToHtml({ path: `${__dirname}/files/sample3.docx` }, options)
    .then(function (result) {
      var html = result.value;
      var messages = result.messages;
      console.log(html);
      console.log(messages);
      res.send(JSON.stringify(html));
    })
    .done();
});

app.use("/blogs", blogRoutes);
app.use("/gamify", gamifyRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "Page not found." });
});
