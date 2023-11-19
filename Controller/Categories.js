const CarlistSchema = require('../Model/Catlist')

const CategorisePutRequest =  async (req, res)=>{
    const {SubCategories, _id} = req.body
  
console.log(req.body)
try {
    const cart = await CarlistSchema.findById(_id);
  
     if (!cart) {
            return res.status(404).json({ message: 'Cart Already Exited' });
          }
    cart.SubCategories = [...cart.SubCategories, SubCategories]
    const updatedUser = await cart.save();   
          res.status(200).json({ message: 'Items added to SubCategories array successfully', updatedUser });
          console.log(cart)
      
}catch (error){
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
}


  
  }

  module.exports = {CategorisePutRequest}