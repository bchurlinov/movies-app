const express = require("express");
const router = express.Router();
const checkUser = require("../middleware/authMiddleware");

const { createPost, loadPosts } = require("../controllers/postController");

router.route("/create-post").post(checkUser, createPost);
router.route("/get-posts").get(checkUser, loadPosts);

module.exports = router;