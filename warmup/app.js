const express = require("express");

const app = express();

app.listen(3000);

app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});

app.get("/about-us", (req, res) => {
  res.redirect("/about", { root: __dirname });
});

// no match requests above, so this function below will run
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});