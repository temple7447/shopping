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


const [SubCategories,setSubCategories] = useState('')
const [selectedCategories, setselectedCategories] = useState('')
const [productName, setProductName] = useState('')
const [price, setPrice] = useState(0)
const [shortD, setShortD] = useState('')
const [longD, setLongD] = useState('')
const [Image, setImage] = useState(null)
const [productStatus,setproductStatus] = useState('')
const [discountprice,setdiscountprice ] = useState(0)
const [totalQuantity, setTotalQuantity] = useState(0)
const [brandName, setBrandName] = useState(0)
const [selectColor, setselectColor] = useState('')


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
        downloadUrls,
        productStatus,
        discountprice,
        totalQuantity,
        brandName,
        selectColor,
    
    
    } = req.body;


    const NewProduct = new databaseSchema({
        Categories: selectedCategories,
        SubCategories: SubCategories,
        Description: shortD,
        Title: productName,
        Price: price,
        Images: downloadUrls,
        longD:longD,
        productStatus:productStatus,
        discountprice:discountprice,
        totalQuantity:totalQuantity,
        brandName:brandName,
        selectColor:selectColor





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