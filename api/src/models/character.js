const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    episodes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Episode'
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

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;