const express = require("express")
const router = express.Router()
const mongoose = require("mongoose");
const databaseSchema = require('../Model/Product')
const CarlistSchema = require('../Model/Catlist')
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
    const { _id } = req.body
    console.log(_id)

    databaseSchema.findOneAndDelete({ _id })
        .then((user) => {
            if (user) {
               res.status(201).json({message:'It was successfully Deleted'})
            }
            else {
                res.json({message:"item does not exist"})
            }

        })
        .catch((err) => {
            console.log(err)
        })
})
router.post('/upload_Categories/listadd', (req, res) => {
    // console.log(req.body)
    const { _id } = req.body
    console.log(_id)

    databaseSchema.findOneAndDelete({ _id })
        .then((user) => {
            if (user) {
               res.status(201).json({message:'It was successfully Deleted'})
            }
            else {
                res.json({message:"item does not exist"})
            }

        })
        .catch((err) => {
            console.log(err)
        })
})


router.get("/CartList", (req, res)=>{
  
    CarlistSchema.find({})
    .then((resp)=>{
        res.status(200).json({message: resp})
    }).catch((err)=> res.status(500).json({ message:err}))


  
  
  })


router.post("/CartList",async (req, res)=>{
    const {Categories} = req.body

    // const cart = await CarlistSchema({Categories});

    // if (cart) {
    //     return res.status(404).json({ message: 'Cart Already Exited' });
    //   }else{

     
  
const SubCategories = []
    const CartList = new CarlistSchema({
        Categories,
        SubCategories
    })
 
    CartList.save({})
    .then((resp)=>{
        console.log("sent")
        res.status(200).json({message: resp})
    }).catch((err)=> res.status(500).json({ message:"not Saved Try again"}))
// }
  })


router.put("/CartList",async (req, res)=>{
    const {SubCategories, _id} = req.body
  
console.log(req.body)

    // const CartList = new CarlistSchema({
    //     Categories
    // })
 
    // CartList.save({})
    // .then((resp)=>{
    //     console.log("sent")
    //     res.status(200).json({message: resp})
    // }).catch((err)=> res.status(500).json({ message:"not Saved Try again"}))
  
  })


module.exports =  router