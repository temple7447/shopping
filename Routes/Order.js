const express = require("express")
const router = express.Router()
const Order = require("../Model/Order")

router.post('/Order', (req, res) => {

    const { cart, id } = req.body;
    const newOrder = new Order({
        Order: cart,profile:id
      });
    
      // Save the new order
      newOrder
        .save()
        .then(() => {
          console.log("Order was successfully saved");
          res.status(201).send("Order was successfully saved");
        })
        .catch((err) => {
          console.error("Error while trying to save the order:", err);
          res.status(500).send("An error occurred while saving the order");
        });

})

router.get('/Order', (req, res) => {
    OrderSchema.find().then((user) => {
        res.json(user)
    }).catch((err) => {
        console.log(err)
    })
})




module.exports =  router