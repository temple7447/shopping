const express = require("express")
const router = express.Router()
const ProfileSchema = require('../Model/Profile')
const  { SignupPut, SignupPost } =  require("../Controller/Auth")
const Testme = require("../Model/Test")

router.get('/profileSignUp', async (req, res) => {
  try {
    const users = await ProfileSchema.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post('/profileSignUp', SignupPost);

router.put("/UpdateProfile", async (req, res) => {
  try {
    const { id, imageUri } = req.body;

    const updatedProfile = await ProfileSchema.findByIdAndUpdate(
      id,
      { imageUri: imageUri },
      { new: true } // Return the updated document
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




router.put('/profileSignUp',  SignupPut);


router.put('/profileSignUp/Address', async (req, res) => {
  try {
    const { _id, Address } = req.body;

    // Find the user by _id
    const user = await ProfileSchema.findById(_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newAddresses = Address.map((addressData) => ({
      address: addressData.address,
      firstName: addressData.firstName,
      lastName: addressData.lastName,
      phoneNumber: addressData.phoneNumber,
      State: addressData.State,
      city: addressData.city,
      timestamp: addressData.timestamp || new Date(), // Use the current timestamp if not provided
    }));

    // Concatenate the new addresses to the existing user's Address array
    user.Address = [...user.Address, ...newAddresses];

    // Save the updated user document
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.put('/profileSignUp/notification', async (req, res) => {
  try {
    const { _id, Notification } = req.body;

    // Find the user by _id
    const user = await ProfileSchema.findById(_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newNotifications = Notification.map((notificationData) => ({
      message: notificationData.message,
      timestamp: notificationData.timestamp || new Date(), // Use the current timestamp if not provided
    }));

    // Concatenate the new notifications to the existing user's Notification array
    user.Notification = [...user.Notification, ...newNotifications];

    // Save the updated user document
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




router.put('/profileSignUp/orderHistory', async (req, res) => {
  try {
    const { _id, orderHistory, firstName, key, label, state, phoneNumber, transaction_id, OrderStatus} = req.body;


    console.log(req.body)
    // Find the user by _id
    const user = await ProfileSchema.findById(_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newOrderHistory = orderHistory.map((orderHistoryData) => ({
      Categories: orderHistoryData.Categories,
      SubCategories: orderHistoryData.SubCategories,
      Description: orderHistoryData.Description,
      longD: orderHistoryData.longD,
      productStatus: orderHistoryData.productStatus,
      discountprice: orderHistoryData.discountprice,
      totalQuantity: orderHistoryData.totalQuantity,
      brandName: orderHistoryData.brandName,
      selectColor: orderHistoryData.selectColor,
      Title: orderHistoryData.Title,
      Price: orderHistoryData.Price,
      Images: orderHistoryData.Images,
      Quantity: orderHistoryData.Quantity,
      AddressfirstName: firstName,
      Addressstate: state,
      Addressid: key,
      Address: label,
      OrderStatus:OrderStatus,
      AddressphoneNumber: phoneNumber,
      transaction_id: transaction_id,
      timestamp: orderHistoryData.timestamp || new Date(), // Use the current timestamp if not provided
    }));

    // Concatenate the new orderHistory to the existing user's orderHistory array
    user.orderHistory = [...user.orderHistory, ...newOrderHistory];

    // Save the updated user document
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.put('/profileSignUp/Favorites', (req, res) => {
  const { _id, Favorites } = req.body;


  ProfileSchema.findById({ _id})
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const newFavorites = Favorites.map((FavoritesData) => ({
 
        Categories: FavoritesData.Categories, 
        SubCategories: FavoritesData.SubCategories, 
        Description: FavoritesData.Description, 
        Title: FavoritesData.Title, 
        Price: FavoritesData.Price, 
        Images: FavoritesData.Images, 
        Quantity: FavoritesData.Quantity, 

        timestamp: FavoritesData.timestamp || new Date(), // Use the current timestamp if not provided
      }));

      // Concatenate the new addresses to the existing user's Address array
      user.Favorites = [...user.Favorites, ...newFavorites];

      return user.save();
    })
    .then((updatedUser) => {
      res.json(updatedUser);

    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});




router.post('/profileSignUp/Address', async (req, res) => {
  try {
    const { _id, addressId } = req.body;
console.log(_id, addressId)
    // Find the user by _id
    const user = await ProfileSchema.findById(_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the index of the address object you want to remove
    const addressIndex = user.Address.findIndex((address) => address._id.toString() === addressId);

    // If the address with the given addressId was found, remove it
    if (addressIndex !== -1) {
      user.Address.splice(addressIndex, 1); // Remove the address at the found index
    } else {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Save the updated user document
    const updatedUser = await user.save();

    res.json(updatedUser);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post('/profileSignUp/OrderCompleted', async (req, res)=>{

  try {
    
 
  const { _id, OrderStatus, userId} = req.body
console.log(_id, userId)

const user = await ProfileSchema.findById({_id:userId} )

if (!user) {
  return res.status(404).json({ error: 'User not found' });
}

const orderHistory = user.orderHistory
const newOrderUpdate =  orderHistory.find((item)=> item._id.toString() === _id)

console.log("me", newOrderUpdate.OrderStatus)

newOrderUpdate.OrderStatus = OrderStatus;

await user.save();

console.log("Updated OrderStatus:", newOrderUpdate.OrderStatus);

// Send a response if needed
res.status(200).json({ message: 'OrderStatus updated successfully' });


} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}


})


router.post('/test', async (req, res)=>{

  const { name } = req.body

// const user = await Testme.findOne({name})
// if(user){
// console.log("user find")
// }
const saveme = new Testme({
  name
})

 const resp = await saveme.save()
res.send(resp)



})



module.exports = router