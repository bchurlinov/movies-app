const express = require("express");
const router = express.Router();
const checkUser = require("../middleware/authMiddleware");

const { register, login } = require("../controllers/authController");

router.route("/register").post(register);
router.route("/login").post(login);


module.exports = router;