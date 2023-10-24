const mongoose = require('mongoose')
const Schema = mongoose.Schema



const CarlistSchema = new Schema({
    Categories: { type: String, required: true },
    SubCategories: [{ type: String }],
  
    createdAt: { type: Date, default: Date.now },

})



module.exports = mongoose.model("ShoppingCat", CarlistSchema)