const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    characters: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character'
    },
    guests: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest'
    },
    other: {
        type: Map,
        of: String
    }
});

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;