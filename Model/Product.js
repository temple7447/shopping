const mongoose = require('mongoose')
const Schema = mongoose.Schema





const databaseSchema = new Schema({
    Categories: { type: String, required: true },
    brandName: { type: String, required: true },
    selectColor: { type: String, required: true },
    SubCategories: { type: String, required: true },
    Description: { type: String, required: true },
    productStatus: { type: String, required: true },
    longD: { type: String, required: true },
    Title: { type: String, required: true },
    Price: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
    discountprice: { type: Number, required: true },
    Quantity: { type: Number, required: true , default :0 },
    Images: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now },

})



module.exports = mongoose.model("ShoppingItems", databaseSchema)