const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');

const PaymentSchema = new Schema(
  {
    paymentID: {
      type: String,
      default: uuid.v4,
      required: true,
    },
    BuyerID: {
      type: String,
      required: true,
    },
    productsID: [{ type: mongoose.Schema.Types.ObjectId }],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Payment', PaymentSchema);
