const User = require("../models/User");
const _ = require("lodash");
const errorCheck = require("../middleware/errorMiddleware");

// @route   /api/user/follow/:id
// @desc    Follow User
// @access  Private

exports.followUser = async (req, res) => {
    try {

        const userToFollow = req.params.id;
        const user = await User.findById(req.user.id);

        const checkFollowing = _.includes(user.following, userToFollow);

        if (checkFollowing) {
            return res.status(400).json({ message: "You are already following this user" })
        }

        const addFollow = [...user.following, userToFollow];
        await User.findByIdAndUpdate(req.user.id, { $set: { following: addFollow } });
        res.status(200).json({ message: "You are following this user now" });

    } catch (err) {
        const error = new errorCheck(500, err.message, res);
        return error.showError()
    }
}

// @route   /api/user/unfollow/:id
// @desc    Unfollow User
// @access  Private

exports.unfollowUser = async (req, res) => {
    try {

        const userToUnfollow = req.params.id;
        const user = await User.findById(req.user.id);

        const checkFollowing = _.includes(user.following, userToUnfollow);

        if (!checkFollowing) {
            return res.status(400).json({ message: "Please follow this user in order to unfollow him" })
        }

        const filtered = _.filter(user.following, user => {
            return user !== userToUnfollow
        });

        await User.findByIdAndUpdate(req.user.id, { $set: { following: filtered } });
        res.status(200).json({ message: "You are not following this user anymore" });

    } catch (err) {
        const error = new errorCheck(500, err.message, res);
        return error.showError()
    }
}
