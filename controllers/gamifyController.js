const pdfParse = require("pdf-parse");
const path = require("path");

const gamify_index = (req, res) => {
  res.render("gamify/index", { title: "Gamify", blogs: result });
};

const gamify_file_post = (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.file;
  console.log("Requesting...");
  const extensionName = path.extname(file.name);
  const allowedExtension = [".docx"];
  const targetPath = path.join(__dirname, "..", "files/gamify", file.name);
  console.log("target path: " + targetPath);

  if (!allowedExtension.includes(extensionName)) {
    // return res.status(422).send("Invalid file.");
    return res.send.status(422).send({
      status: "failed",
      message: "Invalid file.",
    });
  }

  file.mv(targetPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    return res.send({
      status: "success",
      message: "File was uploaded successfully.",
      file: file,
      path: targetPath,
    });
  });
};

const gamify_create_get = (req, res) => {
  res.render("gamify/create", { title: "Gamify" });
};

module.exports = {
  gamify_index,
  gamify_create_get,
  gamify_file_post,
};
