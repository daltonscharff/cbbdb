const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    number: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    bestOf: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        trim: true
    },
    releaseDate: {
        type: String,
        trim: true
    },
    duration: {
        type: String,
        trim: true
    },
    characters: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Character'
    },
    guests: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Guest'
    }
}, {
    strict: false
});

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;