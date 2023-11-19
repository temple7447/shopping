const express = require("express")
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require("mongoose");
require("./config/db")
const cors = require('cors');
const options = require('./Data/Categories')
const ProfileSchema = require('./Model/Profile')
const Order = require('./Routes/Order')
const Profile = require('./Routes/Profile')
const Categories = require('./Routes/Categories')



const PORT = process.env.PORT || 4000

app.use(express.json()); // For parsing JSON data in request bodies
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.get('/Categories', (req, res) => {
    res.json(options)
})
app.get('/', (req, res) => {
    res.json(options)
})

app.use("/", Order)
app.use("/", Profile)
app.use("/", Categories)



app.get('/Profile0rders',async (req, res) => {

    try {
        // // const profileWithOrdersArray = await ProfileSchema.find({}).populate('PersonalDetails');
        // // res.status(200).json(profileWithOrdersArray); 
        // const profileWithOrdersArray = await ProfileSchema.find({}).populate('orders');
        // for (const profileWithOrders of profileWithOrdersArray) {
        //   console.log(profileWithOrders.orders); // Array of associated orders for each profile
        // }

        const profileWithOrdersArrays = await ProfileSchema.find({}).populate('orders');

// Create an array of profiles with associated orders
const profilesWithOrders = profileWithOrdersArrays.map(profile => {
  return {
    ...profile.toObject(), // Convert Mongoose document to plain object
    orders: profile.orders.map(order => order.toObject()) // Convert order documents to plain objects
  };
});
res.status(200).json(profilesWithOrders); 


        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
})







app.listen(PORT, () => {
    console.log(`server is running on Port ${PORT}`)
})