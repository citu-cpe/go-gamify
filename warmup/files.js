const fs = require("fs");

// reading files
// fs.readFile("./docs/noice.txt", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data.toString());
// });

// console.log("So fast");

// writing files
// fs.writeFile("./docs/noice.txt", "noice noice", () => {
//   console.log("file was written");
// });

// directories
// console.log(fs.existsSync("./assets"));
if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }

    console.log("Folder created.");
  });
} else {
  fs.rmdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Folder deleted.");
  });
}

if (fs.existsSync("./docs/noice2.txt")) {
  fs.unlink("./docs/noice2.txt", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("File deleted.");
  });
}
