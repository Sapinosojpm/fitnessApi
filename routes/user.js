const express = require("express");
const { register, login, getUserDetails } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/details", authMiddleware, getUserDetails); // Change route to "/details"

module.exports = router;
