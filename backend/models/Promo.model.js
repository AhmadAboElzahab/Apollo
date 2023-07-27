const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromoSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    value: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Promo', PromoSchema);
