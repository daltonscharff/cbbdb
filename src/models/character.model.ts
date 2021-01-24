import mongoose from "mongoose";

const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    }
}, { strict: false });

const Character = mongoose.model('Character', schema);

export { Character as default, schema };