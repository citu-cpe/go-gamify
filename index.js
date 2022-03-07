const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const { render } = require("ejs");

const app = express();

// connect to mongodb
const dbURI =
  "mongodb+srv://node-user-01:NodeUser001-@cluster0.afth4.mongodb.net/noice-node?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("Connected to db");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// register view engine
app.set("view engine", "ejs");
// app.set("views", "yourOwnViewsFolder"); if you want to change the "views" defaut folder

// morgan is a middleware that simplifies logging processes
app.use(morgan("dev"));

// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "new blog",
//     snippet: "about my new blog",
//     body: "body of my new blog"
//   });

//   // save the blog in mongodb
//   blog.save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// })

// app.get("/single-block", (req, res) => {
//   Blog.findById("6223597deb11f6f969fd3715")
//     .then((result) => {
//       res.send(result)
//     }).catch((err) => {
//       console.log(err);
//     });
// })

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// })

// middleware static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   console.log("New request made.");
//   console.log("host: " + req.hostname);
//   console.log("path: " + req.path);
//   console.log("method: " + req.method);
//   next(); // specifies to the app to proceed to next code statements
// });

app.get("/", (req, res) => {
  console.log("redirect");
  res.redirect("/blogs");
  // res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "Page not found." });
});
