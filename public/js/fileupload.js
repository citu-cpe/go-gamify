// File uploader

const dropArea = document.getElementById("dropArea");
const dropAreaText = document.getElementById("dropAreaText");
const browseBtn = document.getElementById("browseBtn");
const browseInput = document.getElementById("browseInput");
const body = document.querySelector("body");
const contentArea = document.getElementById("contentArea");

body.addEventListener("dragover", (event) => {
  console.log("Body drag");
  event.preventDefault();
});

let file;

browseBtn.onclick = () => {
  browseInput.click();
};

browseInput.addEventListener("change", function () {
  file = this.files[0];
  // showFile();
  dropArea.classList.add("drag-active");
});

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  console.log("Dragging file in dropArea.");
  dropAreaText.textContent = "Release to Upload File";
  dropArea.classList.add("drag-active");
});

dropArea.addEventListener("dragleave", () => {
  console.log("File in dropArea has left.");
  dropArea.classList.remove("drag-active");
  dropAreaText.textContent = "Drag and Drop to Upload File";
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  console.log("File in dropArea has been dropped.");
  dropArea.classList.remove("drag-active");
  dropAreaText.textContent = "Release to Upload File";
  //   dropArea.classList.remove("drag-active");
  file = event.dataTransfer.files[0];
  console.log(file);
});

uploadBtn.addEventListener("click", () => {
  const formData = new FormData();

  formData.append("pdfFile", inpFile.files[0]);

  fetch("./extract", {
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
});

function showFile() {
  let fileType = file.type;
  console.log(fileType);

  const validFileExtensions = ["text/plain", "application/pdf"];

  if (validFileExtensions.includes(fileType)) {
    console.log("Valid file type: " + fileType);
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      // let imgTag = `<img src="${fileURL}" alt="">`;
      // cotnen.innerHTML = imgTag;
      // const lines = fileContent.split(/\r\n|\n/);
      contentArea.textContent = fileURL.replace("/g", "\n");
      // contentArea.textContent = fileURL;
    };
    fileReader.readAsText(file);
  } else {
    console.log("!! Invalid file type: " + fileType);
    alert("File type invalid.");
  }
}
