import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookies from "../utils/generateToken.js";

export const signup = async(req, res) => {
  try{
    const { fullName, username, password,confirmPassword, gender } = req.body;
   
    if(password!== confirmPassword){
      return res.status(400).json({
        error : "Passwords do not match"
      });
    }

    const user = await User.findOne({username});
    if(user){
      return res.status(400).json({
        error : "Username already exists"
      });
    }

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const salt = await bcrypt.genSalt(10);
    // console.log("Salt: ", salt); //Salt:  $2a$10$ZJMkPZiMTwYd07nJEHdOX. hAR BAR NEW
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male"? boyProfilePic : girlProfilePic
    });
    
    if(newUser){
      generateTokenAndSetCookies(newUser._id, res);
      //yaha we are giving control of res, it uses to store cookies

      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        fullName: newUser.fullName,
        gender: newUser.gender,
        profilePic: newUser.profilePic
      });
    }
    else{
      res.status(400).json({
        error: "Invalid User Data"
      });
    }

  }
  catch(err){
   console.log("Error in Signup Controller: ", err.message);
   res.status(500).json({error:"Internal Server Error,"+err.message});
  }
};

export const login = async(req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user?user.password:"");

    if(!user ||!isPasswordCorrect){
      return res.status(400).json({error: "Invalid Credentials"});
    }

    generateTokenAndSetCookies(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
      gender: user.gender,
      profilePic: user.profilePic
    });

  } catch (error) {
      console.log("Error in Login Controller: ", error.message);
      res.status(500).json({error:"Internal Server Error," +error.message});
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt","", {maxAge:0})
    res.status(200).json({message:"User Logged Out"});
  }catch (error) {
    console.log("Error in Logout Controller: ", error.message);
    res.status(500).json({error:"Internal Server Error," +error.message});
  }
}