const express = require("express");
const { registerUser, loginUser, verifyToken } = require("../Controller/Register");
const router = express.Router();

// The register route is now available at "/register"
router.post("/register", registerUser);

router.post("/login", loginUser);
 
router.post("/verify", verifyToken);

module.exports = router;
