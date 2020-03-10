const Movie = require("../models/Movie");
const slugify = require("slugify");
const errorCheck = require("../middleware/errorMiddleware");
const _ = require("lodash");

exports.addMovie = async (req, res) => {
    try {

        const { title, description, releaseDate, actors, image } = req.body;

        const newActorsArr = [];
        actors.forEach(actor => {
            newActorsArr.push({
                name: actor.name,
                image: actor.image,
                slug: slugify(actor.name, { lower: true })
            })
        })

        const addMovie = new Movie({
            title,
            description,
            releaseDate,
            actors: newActorsArr,
            image,
        });

        await addMovie.save();
        res.status(200).json({ message: "Movie added successfully" })

    } catch (err) {
        const error = new errorCheck(500, err.message, res);
        return error.showError()
    }
}

exports.getActorsMovies = async (req, res) => {
    try {

        let actor = "";
        let actorArr = [];
        const actors = req.params.actor.split("-");
        const actorsName = actors.forEach(name => {
            actor += _.startCase(_.toLower(name)) + " ";
        });

        actorArr[0] = actor.trim();

        const movies = await Movie.find({ actors: { $elemMatch: { name: { $in: actorArr } } } });
        res.status(200).json({ actorsMovies: movies })

    } catch (err) {
        const error = new errorCheck(500, err.message, res);
        return error.showError()
    }
}

//Y187H4UT