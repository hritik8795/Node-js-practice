const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authmiddleware");
const {
  uploadPhotos,
  getAllPhotos,
} = require("../controllers/photoController");

//protecting all routes

router.use(authMiddleware);

//upload multiple photos

router.post("/", upload.array("photos", 10), uploadPhotos);

// get all photos uploaded by the user

router.get("/", getAllPhotos);

module.exports = router;
