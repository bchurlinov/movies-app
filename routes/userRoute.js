const express = require("express");
const router = express.Router();
const checkUser = require("../middleware/authMiddleware");

const { followUser, unfollowUser } = require("../controllers/userController");

router.route("/follow/:id").post(checkUser, followUser);
router.route("/unfollow/:id").delete(checkUser, unfollowUser);

module.exports = router;