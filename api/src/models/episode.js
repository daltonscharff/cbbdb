const mongoose = require('mongoose');
const Character = require('./character');
const Guest = require('./guest');

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
    characters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character'
    }],
    guests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest'
    }]
}, {
    strict: false
});

episodeSchema.pre('remove', async function (next) {
    const episode = this;

    episode.characters.forEach(async ({_id}) => {
        let character = await Character.findById(_id);
        character.episodes = character.episodes.filter((id) => id != episode.id);
        character.save();
    });
    episode.guests.forEach(async ({_id}) => {
        let guest = await Guest.findById(_id);
        guest.episodes = guest.episodes.filter((id) => id != episode.id);
        guest.save();
    });

    next();
});

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;