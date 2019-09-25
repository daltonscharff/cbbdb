const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    }
});

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;