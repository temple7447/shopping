const mongoose = require("mongoose")

const mongoDBUrl = "mongodb+srv://E_shopping:E_shopping@cluster0.ohii5.mongodb.net/?retryWrites=true&w=majority";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,


};

// Connect to MongoDB using Mongoose
const db = mongoose.connect(mongoDBUrl, options)
    .then(() => {
        console.log('Connected to MongoDB successfully!');
        // Start your application or perform operations with the database here
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


module.exports = db