const express = require("express");
const router = express.Router();

const gamifyController = require("../controllers/gamifyController");

router.get("/", gamifyController.gamify_index);
router.get("/create", gamifyController.gamify_create_get);
router.post("/upload", gamifyController.gamify_file_post);
router.get("/get-html", gamifyController.gamify_get_html);
module.exports = router;
