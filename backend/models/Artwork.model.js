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
        data: Buffer,
        contentType: String
    }

})


module.exports = mongoose.model('Artwork', ArtworkSchema)