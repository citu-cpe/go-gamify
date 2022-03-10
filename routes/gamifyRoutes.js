const express = require("express");
const router = express.Router();
console.log("Passing through blog routes...");
const gamifyController = require("../controllers/gamifyController");

router.get("/", gamifyController.gamify_index);
router.get("/create", gamifyController.gamify_create_get);
router.post("/create/extract", gamifyController.gamify_create_extract);

module.exports = router;
