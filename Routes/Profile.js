const express = require("express")
const router = express.Router()
const ProfileSchema = require('../Model/Profile')

router.get('/profileSignUp', (req, res) => {
  ProfileSchema.find().then((user) => {
    res.json(user)
  }).catch((err) => {
    console.log(err)
  })
})


router.post('/profileSignUp', (req, res) => {
  const { firstName,
    lastName,UserName,
    phoneNumber, Address, Notification, orderHistory, Ratings, Favorites,StateP,
    email, imageUri } = req.body
    console.log(req.body)

  const NewProfile = new ProfileSchema({
    UserName: UserName,
    firstName: firstName,
    lastName: lastName,
    Address: Address,
    phoneNumber: phoneNumber,
    Notification: Notification,
    orderHistory: orderHistory,
    email: email,
    StateP: StateP,
    Ratings: Ratings,
    Favorites: Favorites,
    imageUri: imageUri,
  })

  NewProfile.save({})
    .then(() => {
      console.log("it was successfully saved")
      res.send("you are welcome")
    })
    .catch((err) => console.log("there was an error while trying to upload the code"))



})

router.put("/UpdateProfile", async (req, res) => {
  const { id, imageUri } = req.body;



  try {
    // Find the profile by ID and update the imageUri field
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




router.put('/profileSignUp', (req, res) => {
  const { _id, firstName, lastName, imageUri,phoneNumber } = req.body;

  ProfileSchema.findByIdAndUpdate({ _id}, { 
    firstName, lastName, imageUri, phoneNumber
  })
   

    .then((updatedUser) => {
      res.json(updatedUser);

    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});


router.put('/profileSignUp/Address', (req, res) => {
  const { _id, Address } = req.body;

  ProfileSchema.findById({ _id})
    .then((user) => {
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


router.put('/profileSignUp/notification', (req, res) => {
  const { _id, Notification } = req.body;

  ProfileSchema.findById({ _id})
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const newNotification = Notification.map((NotificationData) => ({
 
        message: NotificationData.message, 
        timestamp: NotificationData.timestamp || new Date(), // Use the current timestamp if not provided
      }));

      // Concatenate the new addresses to the existing user's Address array
      user.Notification = [...user.Notification, ...newNotification];

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




router.put('/profileSignUp/orderHistory', (req, res) => {
  const { _id, orderHistory ,firstName,key,label,state,phoneNumber} = req.body;

  ProfileSchema.findById({ _id})
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const neworderHistory = orderHistory.map((orderHistoryData) => ({
 
        Categories: orderHistoryData.Categories, 
        SubCategories: orderHistoryData.SubCategories, 
        Description: orderHistoryData.Description, 
        Title: orderHistoryData.Title, 
        Price: orderHistoryData.Price, 
        Images: orderHistoryData.Images, 
        Quantity: orderHistoryData.Quantity, 
      AddressfirstName:firstName,
      Addressstate:state,
      Addressid:key,
      Address:label,
      AddressphoneNumber:phoneNumber,
        timestamp: orderHistoryData.timestamp || new Date(), // Use the current timestamp if not provided
      }));

      // Concatenate the new addresses to the existing user's Address array
      user.orderHistory = [...user.orderHistory, ...neworderHistory];

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


router.delete('/profileSignUp/Address', (req, res) => {
  const { _id, addressId } = req.body;

  ProfileSchema.findById({ _id })
    .then((user) => {
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

      return user.save(); // Save the updated user document
    })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});


module.exports = router