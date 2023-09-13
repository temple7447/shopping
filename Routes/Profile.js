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
    // console.log(req.body)

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


module.exports = router