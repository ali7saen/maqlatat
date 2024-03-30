const express = require("express");
const { loginUser_post, loginUser_get } = require("../controllers/auth")

const router = express.Router();

router.post("/login", loginUser_post);
router.get("/login", loginUser_get);

module.exports = router;