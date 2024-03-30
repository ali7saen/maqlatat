const express = require("express");
const { deleteAdmin_post, registerAdmin_post,
    registerAdmin_get, logoutAdmin_get, delteAdmin_get } = require("../controllers/admin");

const { fileValidation, uploadImage, adminDataValidation, } = require("../middlewares/admin");

const router = express.Router();

router.get("/register", registerAdmin_get);
router.get("/delete", delteAdmin_get);


router.post("/register", uploadImage.single("image"), fileValidation, adminDataValidation, registerAdmin_post);
router.post("/delete", deleteAdmin_post);
router.get("/logout", logoutAdmin_get);

module.exports = router;
