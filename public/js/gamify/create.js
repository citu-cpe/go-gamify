const dropArea = document.getElementById("dropArea");
const dropAreaText = document.getElementById("dropAreaText");
const browseBtn = document.getElementById("browseBtn");
const gamifyBtn = document.getElementById("gamifyBtn");
const browseInput = document.getElementById("browseInput");
const body = document.querySelector("body");
const contentArea = document.getElementById("contentArea");
const resultText = document.getElementById("resultText");
const clearBtn = document.getElementById("clearBtn");

body.addEventListener("dragover", (event) => {
  event.preventDefault();
});

let file;

browseBtn.onclick = () => {
  browseInput.click();
};

browseInput.addEventListener("change", function () {
  file = this.files[0];
  uploadFile();
});

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropAreaText.textContent = "Release to Upload File";
  dropArea.classList.add("drag-active");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("drag-active");
  dropAreaText.textContent = "Drag and Drop to Upload File";
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  dropArea.classList.remove("drag-active");
  dropAreaText.textContent = "Release to Upload File";
  file = event.dataTransfer.files[0];
  uploadFile();
});

gamifyBtn.addEventListener("click", () => {
  fetch("./file", {
    method: "get",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      appendHTML(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

clearBtn.addEventListener("click", (event) => {
  deleteFile();
});

const appendHTML = (html) => {
  contentArea.innerHTML = html;
};

const uploadFile = () => {
  const formData = new FormData();

  formData.append("file", file);

  fetch("./file", {
    method: "post",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Sorry, something went wrong.");
    })
    .then((data) => {
      resultText.value = data.file.name;
    })
    .catch((err) => {
      resultText.value = err.message;
      console.log(err);
    });
};

const deleteFile = () => {
  console.log("Deleting file...");
  fetch("./file", {
    method: "DELETE",
  }).then((data) => {
    console.log("Done");
  });

  // fetch("./file", {
  //   method: "delete",
  // }).then((data) => {
  //   console.log("Done");
  // });
};
