const User = require("../models/User");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const config = require("config");
const errorCheck = require("../middleware/errorMiddleware");
const jwt = require("jsonwebtoken");

// @route   /api/auth/register
// @desc    Register User
// @access  Public

exports.register = async (req, res) => {
    try {

        const { name, lastname, email, password, genres } = req.body;
        const users = await User.findOne({ email });

        if (users) {
            return res.status(500).json({ message: "User with that name / e-mail address already exists" })
        }

        const registerUser = new User({
            name,
            lastname,
            email,
            password,
        });

        const newUser = await registerUser.save();
        res.status(200).json({ message: "User successfully registerd", newUser })


    } catch (err) {
        const error = new errorCheck(500, err.message, res);
        return error.showError()
    }
}

// @route   /api/auth/login
// @desc    Login User
// @access  Public

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        const { email, password } = req.body;

        if (!user) {
            return res.status(500).json({ message: "E-email and / or user do not match our records" })
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(500).json({ message: "E-mail and / or password do not match our records" })
        }

        const secretToken = config.get("jwtSecret");
        jwt.sign({ user: { id: user.id } }, secretToken, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        });

    } catch (err) {
        const error = new errorCheck(500, err.message, res);
        return error.showError()
    }
}
