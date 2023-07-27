const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArtworkSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    descreption: {
        type: String,
        required: true
    },
    art: {
        type: String,
        required: true
    }

})


module.exports = mongoose.model('Artwork', ArtworkSchema)