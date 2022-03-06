// blog_index blog_details blog_create_get blog_create_post blog_create

const Blog = require("../models/blog");

const blog_index = (req, res) => {
    console.log("Blog index...");
      Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
          res.render("blogs/index", { title: "All blogs", blogs: result });
        })
        .catch((err) => {
          res.render("404", { title:"Sorry, something went wrong."})
        });
}

const blog_details = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { title: "Blog Details", blog: result });
    })
    .catch((err) => console.log(err));
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create blog" });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      res.render("404", { title:"Sorry, something went wrong."})
    });
};

const blog_create_delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      res.render("404", { title:"Sorry, something went wrong."})
    });
};

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_create_delete
}