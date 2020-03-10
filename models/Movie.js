const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Movie title is required"]
    },
    description: {
        type: String,
        required: [true, "Movie description is required"]
    },
    releaseDate: {
        type: Date,
        required: [true, "Movie's release date is required"]
    },
    actors: [
        {
            name: {
                type: String,
                required: true
            },
            image: {
                type: String
            },
            slug: {
                type: String,
                required: [true, "Please create actor's name slug"]
            }
        }
    ],
    image: {
        type: String,
        required: [true, "Movie image is required"]
    },
    rating: [
        {
            user: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: [true, "Please add a rating as a number"]
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    reviews: [
        {
            name: {
                type: String,
                required: [true, "User for the review is required"]
            },
            text: {
                type: String,
                required: [true, "Review is required"]
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = Movie = mongoose.model("movie", MovieSchema);