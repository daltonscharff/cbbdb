import mongoose from "mongoose";

const characterSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    }
}, { strict: false });

const Character = mongoose.model('Character', characterSchema);

export { Character as default, characterSchema };