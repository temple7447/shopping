const express = require("express")
const router = express.Router()
const mongoose = require("mongoose");
const databaseSchema = require('../Model/Product')
const CarlistSchema = require('../Model/Catlist');
const { CategorisePutRequest } = require("../Controller/Categories");
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
    productStatusState,
    selectedOption,
    View,
    Specificationobject
    
    } = req.body;

    console.log(req.body)


    const NewProduct = new databaseSchema({
        Categories: selectedCategories,
        SubCategories: SubCategories,
        Description: shortD,
        Title: productName,
        Price: price,
        Images: downloadURL,
        longD:longD,
        Specificationobject:Specificationobject,
        productStatus:productStatus,
        productStatusState:productStatusState,
        discountprice:discountprice,
        totalQuantity:totalQuantity,
        View:View,
        brandName:brandName,
        selectColor:selectColor,
        selectedOption:selectedOption





    })

    NewProduct.save({})
        .then(() => {
            console.log("it was successfully saved")
            res.status(200).json({message:"you are welcome"})
        })
        .catch((err) => console.log(err))




})





router.post("/upload_Categories/edit", async (req, res) => {
    try {
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
        View,
        brandName,
        selectColor,
    productStatusState,
    selectedOption,
    _id
    
    } = req.body;

    console.log(req.body)

    const EditProduct = {
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
        View:View,
        brandName:brandName,
        selectColor:selectColor,
        selectedOption:selectedOption
    }

    const updatedProduct = await databaseSchema.findByIdAndUpdate(
      _id,
      EditProduct,
      { new: true } // Return the updated document
    );


    if (!updatedProduct) {
        return res.status(404).json({ error: "Profile not found" });
      }
  
      res.json(updatedProduct);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
})



router.post('/upload_Categories/delete', (req, res) => {
    // console.log(req.body)
    const { _id } = req.body
    

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




router.post('/upload_Categories/status' ,async (req, res) => {
    // console.log(req.body)
    try {
    const { _id,productStatusvalue } = req.body

//  console.log(req.body)

    const updatedProfile = await databaseSchema.findByIdAndUpdate({_id},{productStatusState:productStatusvalue} , { new: true } )

    if (!updatedProfile) {
        return res.status(404).json({ error: "Profile not found" });
      }
  
      res.json(updatedProfile);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
        
})


router.post('/View' ,async (req, res) => {
    // console.log(req.body)
    try {
    const { _id,View } = req.body

//  console.log(req.body)

    const updatedProfile = await databaseSchema.findByIdAndUpdate({_id},{View:View} , { new: true } )

    if (!updatedProfile) {
        return res.status(404).json({ error: "Profile not found" });
      }
  
      res.json(updatedProfile);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
        
})


router.post('/upload_Categories/listadd', (req, res) => {
    // console.log(req.body)
    const { _id } = req.body
 

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


router.put("/CartList", CategorisePutRequest )


module.exports =  router