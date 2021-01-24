import mongoose from "mongoose";

const schema = new mongoose.Schema({
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

const Guest = mongoose.model('Guest', schema);

export { Guest as default, schema };