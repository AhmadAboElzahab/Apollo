const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LyricsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    lyrics: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

});

module.exports = mongoose.model('Lyrics', LyricsSchema);
