const express = require("express")
const router = express.Router()
const mongoose = require("mongoose");
const databaseSchema = require('../Model/Project')

router.get('/upload_Categories', (req, res) => {


    databaseSchema.find().then((user) => {
        res.json(user)
    }).catch((err) => {
        console.log(err)
    })
})


router.post("/upload_Categories", (req, res) => {
    const { selectedOption,
        subselectedOption,
        descriptionFields,
        TitleFields,
        priceFields,
        downloadUrls } = req.body;


    const NewProduct = new databaseSchema({
        Categories: selectedOption,
        SubCategories: subselectedOption,
        Description: descriptionFields,
        Title: TitleFields,
        Price: priceFields,
        Images: downloadUrls
    })

    NewProduct.save({})
        .then(() => {
            console.log("it was successfully saved")
            res.send("you are welcome")
        })
        .catch((err) => console.log("there was an error while trying to upload the code"))



    res.send('your are welcome')
})



router.post('/upload_Categories/delete', (req, res) => {
    // console.log(req.body)
    const { id } = req.body

    databaseSchema.findOneAndDelete({ _id: id })
        .then((user) => {
            if (user) {
                console.log("item deleted")
            }
            else {
                console.log("item does not exist")
            }

        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports =  router