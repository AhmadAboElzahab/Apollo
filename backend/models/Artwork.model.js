const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtworkSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    art: {
        type: String, // Store the image name (file path) as a string
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Artwork', ArtworkSchema);
