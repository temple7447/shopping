const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  Order: { type: [String], required: true },
  profile: { type: Schema.Types.ObjectId, ref: 'PersonalDetails' }, // Reference to the Profile model
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
