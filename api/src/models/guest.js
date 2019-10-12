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

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;