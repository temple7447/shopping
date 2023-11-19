const ProfileSchema = require('../Model/Profile')

const SignupPut =  async (req, res) => {
    try {
      const { _id, firstName, lastName, imageUri, phoneNumber } = req.body;
  
      const updatedUser = await ProfileSchema.findByIdAndUpdate(
        _id,
        { firstName, lastName, imageUri, phoneNumber },
        { new: true } // Return the updated document
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(updatedUser);
    } catch (err) {
   
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }



  const SignupPost = async (req, res) => {
    try {
      const { firstName, lastName, UserName, phoneNumber, Address, Notification, orderHistory, Ratings, Favorites, StateP, email, imageUri } = req.body;
      
      const newProfile = new ProfileSchema({ UserName, firstName, lastName, Address, phoneNumber, Notification, orderHistory, email, StateP, Ratings, Favorites, imageUri});
      await newProfile.save();
      console.log("It was successfully saved");
      res.send("You are welcome");
    } catch (err) {
      console.error("There was an error while trying to upload the code:", err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  


  module.exports = {SignupPut, SignupPost}