const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    characters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character'
    }],
    episodes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Episode'
    }]
}, {
    strict: false
});

guestSchema.pre('remove', async function (next) {
    const guest = this;

    guest.characters.forEach(async ({_id}) => {
        let character = await Character.findById(_id);
        character.guests = character.guests.filter((id) => id != guest.id);
        character.save();
    });
    guest.episodes.forEach(async ({_id}) => {
        let episode = await Episode.findById(_id);
        episode.guests = episode.guests.filter((id) => id != guest.id);
        episode.save();
    });

    next();
});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;