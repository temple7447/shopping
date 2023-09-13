const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  Ratings: { type: String },
  StateP: { type: String },
  Address: { type: [String] },
  Notification: { type: [String] },
  orderHistory: { type: [String] },
  Favorites: { type: [String]},
  imageUri: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Virtual field to populate associated orders
ProfileSchema.virtual('orders', {
  ref: 'Order', // The model to use for population
  localField: '_id', // Find orders where `localField` matches `_id` of the profile
  foreignField: 'profile', // Use the `profile` field in the Order model to match
});

const PersonalDetails = mongoose.model('PersonalDetails', ProfileSchema);

module.exports = PersonalDetails;
