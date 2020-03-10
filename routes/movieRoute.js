const express = require("express");
const router = express.Router();
const checkUser = require("../middleware/authMiddleware");

const { addMovie, getActorsMovies } = require("../controllers/movieController");

router.route("/add-movie").post(addMovie);
router.route("/find-actors-movies/:actor").get(getActorsMovies);

module.exports = router;