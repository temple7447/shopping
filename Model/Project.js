const mongoose = require('mongoose')
const Schema = mongoose.Schema


const databaseSchema = new Schema({
    Categories: { type: String, required: true },
    SubCategories: { type: String, required: true },
    Description: { type: String, required: true },
    Title: { type: String, required: true },
    Price: { type: String, required: true },
    Images: { type: [String], required: true },

    createdAt: { type: Date, default: Date.now },

})


module.exports = mongoose.model("ShoppingItems", databaseSchema)