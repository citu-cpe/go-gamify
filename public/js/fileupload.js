// File uploader

const dropArea = document.getElementById("dropArea");
const dropAreaText = document.getElementById("dropAreaText");
const browseBtn = document.getElementById("browseBtn");
const gamifyBtn = document.getElementById("gamifyBtn");
const browseInput = document.getElementById("browseInput");
const body = document.querySelector("body");
const contentArea = document.getElementById("contentArea");
const resultText = document.getElementById("resultText");

body.addEventListener("dragover", (event) => {
  event.preventDefault();
});

let file;

browseBtn.onclick = () => {
  browseInput.click();
};

browseInput.addEventListener("change", function () {
  file = this.files[0];
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

  validateFile();
});

gamifyBtn.addEventListener("click", () => {
  console.log(file);
  validateFile();
});

function validateFile() {
  let fileType = file.type;
  console.log(fileType);

  const validFileExtensions = ["application/pdf"];

  if (validFileExtensions.includes(fileType)) {
    gamifyContents();
  } else {
    console.log("!! Invalid file type: " + fileType);
    alert("File type invalid.");
  }
}

function gamifyContents() {
  const formData = new FormData();

  formData.append("pdfFile", file);

  fetch("./create/extract", {
    method: "post",
    body: formData,
  })
    .then((response) => {
      return response.text();
    })
    .then((extractedText) => {
      console.log(extractedText);
      resultText.value = extractedText;
    });
}
