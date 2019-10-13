const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    nickname: {
        type: String,
        unique: true,
        trim: true
    },
    episodes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Episode'
    }],
    guests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest'
    }]
}, {
    strict: false
});

characterSchema.pre('remove', async function (next) {
    const character = this;

    character.episodes.forEach(async ({_id}) => {
        let episode = await Episode.findById(_id);
        episode.characters = episode.characters.filter((id) => id != character.id);
        episode.save();
    });
    character.guests.forEach(async ({_id}) => {
        let guest = await Guest.findById(_id);
        guest.characters = guest.characters.filter((id) => id != character.id);
        guest.save();
    });

    next();
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;