const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const md5 = require("md5");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: 3
    },
    lastname: {
        type: String,
        required: [true, "Last name is required"],
        minLength: 3
    },
    avatar: {
        type: String
    },
    email: {
        type: String,
        required: [true, "E-mail field is required"],
        unique: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: 6
    },
    role: {
        type: String,
        default: "user"
    },
    following: [String],
    favoriteGenres: [String],
    likedMovies: [],
    givenRatings: [],
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre("save", async function (next) {
    try {

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();

    } catch (err) {
        console.log(err);
    }
});

UserSchema.pre("save", async function (next) {
    try {

        this.avatar = `http://gravatar.com/avatar/${md5(this.email)}?d=identicon`;
        next();

    } catch (err) {
        console.log(err)
    }
});

module.exports = User = mongoose.model("user", UserSchema);