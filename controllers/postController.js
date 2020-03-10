const Post = require("../models/Post");
const User = require("../models/User");
const errorCheck = require("../middleware/errorMiddleware");

// @route   /api/post/create-post
// @desc    Create Post
// @access  Private

exports.createPost = async (req, res) => {
    try {

        const user = await User.findById(req.user.id);

        const newPost = new Post({
            user: req.user.id,
            avatar: user.avatar,
            name: user.name,
            text: req.body.text
        });

        const posted = await newPost.save();
        res.status(200).json({ message: "A post was added successfully", posted });

    } catch (err) {
        const error = new errorCheck(500, err.message, res);
        return error.showError()
    }
}

// @route   /api/post/get-posts
// @desc    Get All Posts
// @access  Private

exports.loadPosts = async (req, res) => {
    try {

        const user = await User.findById(req.user.id);
        const following = user.following;

        if (following.length === 0) {
            return res.status(400).json({ message: "Follow a user so you can see his posts" })
        }

        const getPosts = await Post.find({ "user": { $in: following } });
        res.status(200).json({ message: "Posts loaded successfully", posts: getPosts });

    } catch (err) {
        const error = new errorCheck(500, err.message, res);
        return error.showError()
    }
}

