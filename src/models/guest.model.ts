import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    characters: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false // eventually change to true
    }
}, { strict: false });

const Guest = mongoose.model('Guest', guestSchema);

export { Guest as default, guestSchema };