const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TelegramLogSchema = new Schema({
  Message_id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  asset: {
    type: String,
  },
});

module.exports = mongoose.model('Telegram', TelegramLogSchema);
