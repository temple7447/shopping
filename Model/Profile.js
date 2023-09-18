const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  address: String, 
  firstName: String,
 lastName: String,
  State: String,
  city: String,
  phoneNumber: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});




const orderHistorySchema = new Schema({
  Categories: String,
  SubCategories: String,
  Description: String,
  Title: String,
  Price:Number,
  Images: [String],
  Quantity: Number,
  AddressfirstName:String,
  Addressstate:String,
  Address:String,
  AddressphoneNumber:String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});


const FavoritesSchema = new Schema({
  Categories: String,
  SubCategories: String,
  Description: String,
  Title: String,
  Price:Number,
  Images: [String],
  Quantity: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});


const NotificationSchema = new Schema({
  message: String, 
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ProfileSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String  },
  UserName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  Ratings: { type: String },
  StateP: { type: String },
  Address: [AddressSchema],
  Notification:  [NotificationSchema],
  orderHistory:  [orderHistorySchema],
  Favorites: [FavoritesSchema],
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
