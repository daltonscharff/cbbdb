const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;