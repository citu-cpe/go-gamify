const express = require("express");
const router = express.Router();
console.log("Passing through blog routes...");
const gamifyController = require("../controllers/gamifyController");

router.get("/", gamifyController.gamify_index);
// router.post("/", gamifyController.gamify_create_post);
router.get("/create", gamifyController.gamify_create_get);
router.get("/create/extract", gamifyController.gamify_create_extract);
// router.get("/:id", gamifyController.gamify_details);
// router.delete("/:id", gamifyController.gamify_create_delete);

module.exports = router;
