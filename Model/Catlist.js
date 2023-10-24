const mongoose = require('mongoose')
const Schema = mongoose.Schema


// const CartigoriesSchema = new Schema({
//     address: String, 
//     firstName: String,
//    lastName: String,
//     State: String,
//     city: String,
//     phoneNumber: String,
//     timestamp: {
//       type: Date,
//       default: Date.now,
//     },
//   });



const CarlistSchema = new Schema({
    Categories: { type: String, required: true },
    SubCategories: { type: [String] },
  
    createdAt: { type: Date, default: Date.now },

})



module.exports = mongoose.model("ShoppingCat", CarlistSchema)