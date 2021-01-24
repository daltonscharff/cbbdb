import mongoose from "mongoose";

const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    characters: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false // eventually change to true
    },
    guests: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false // eventually change to true
    }
}, { strict: false });

const Episode = mongoose.model('Episode', schema);

export { Episode as default, schema };