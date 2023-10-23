const express = require("express")
const router = express.Router()
const mongoose = require("mongoose");
const databaseSchema = require('../Model/Product')

// router.get('/upload_Categories', (req, res) => {


//     databaseSchema.find().then((user) => {
//         res.json(user)
//     }).catch((err) => {
//         console.log(err)
//     })
// })



router.get('/upload_Categories', async (req, res) => {
    try {
        const user = await databaseSchema.find();
        res.json(user);
    } catch (err) {
        console.log(err);
    }
});

router.post("/upload_Categories", (req, res) => {
    const { selectedCategories,
        SubCategories,
        productName,
        price,
        shortD,
        longD,
        downloadURL,
        productStatus,
        discountprice,
        totalQuantity,
        brandName,
        selectColor,
    productStatusState
    
    } = req.body;



    const NewProduct = new databaseSchema({
        Categories: selectedCategories,
        SubCategories: SubCategories,
        Description: shortD,
        Title: productName,
        Price: price,
        Images: downloadURL,
        longD:longD,
        productStatus:productStatus,
        productStatusState:productStatusState,
        discountprice:discountprice,
        totalQuantity:totalQuantity,
        brandName:brandName,
        selectColor:selectColor





    })

    NewProduct.save({})
        .then(() => {
            console.log("it was successfully saved")
            res.status(200).json({message:"you are welcome"})
        })
        .catch((err) => console.log(err))




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