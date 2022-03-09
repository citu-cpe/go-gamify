const pdfParse = require("pdf-parse");

// const Blog = require("../models/blog");

const gamify_index = (req, res) => {
  res.render("gamify/index", { title: "Gamify", blogs: result });
};

// const gamify_details = (req, res) => {
//   const id = req.params.id;
//   console.log(id);
//   Blog.findById(id)
//     .then((result) => {
//       res.render("gamify/details", { title: "Blog Details", blog: result });
//     })
//     .catch((err) => console.log(err));
// };

const gamify_create_get = (req, res) => {
  res.render("gamify/create", { title: "Gamify" });
};

const gamify_create_extract = () => {
  if (!req.files && !req.files.pdfFile) {
    res.status(400);
    res.end();
  }

  pdfParse(req.files.pdfFile).then((result) => {
    console.log(result.text);
    res.send(result.text);
  });
};

// const gamify_create_post = (req, res) => {
//   const blog = new Blog(req.body);
//   blog
//     .save()
//     .then(() => {
//       res.redirect("/blogs");
//     })
//     .catch((err) => {
//       res.render("404", { title: "Sorry, something went wrong." });
//     });
// };

// const gamify_create_delete = (req, res) => {
//   const id = req.params.id;

//   Blog.findByIdAndDelete(id)
//     .then((result) => {
//       res.json({ redirect: "/blogs" });
//     })
//     .catch((err) => {
//       res.render("404", { title: "Sorry, something went wrong." });
//     });
// };

module.exports = {
  gamify_index,
  // gamify_details,
  gamify_create_get,
  gamify_create_extract,
  // gamify_create_post,
  // gamify_create_delete,
};
