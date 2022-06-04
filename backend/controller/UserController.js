const asyncHandler = require("express-async-handler");
const User=require("../Models/UserModels")
const generateToken=require("../db/generateToken")

const registerUser=asyncHandler(async(req,res,next)=>{
    const { name, email, password, pic } = req.body;
    
    if (!email||!password||!name) {
        return res.status(400).json({
            success: false,
            error: "Please enter all fields"
        });
    }
        const userExist=await User.findOne({email:email});
        if(userExist){
            return res.status(400).json({
                success: false,
                error: "User already exists"
            }); 
        }
        const user=await User.create({
            name,
            email,
            password,
            pic,
        });
        if (user) {
            res.status(201).json({
              _id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              pic: user.pic,
              token: generateToken(user._id),
            });
          } else {
            res.status(400);
            throw new Error("User not found");
          }
})

const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  

    const users = await User.find(keyword)
    if (users<=1){
        res.send("no users found")
    }
    res.send(users);
  });

  const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Please enter all fields",
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User does not exist",
      });
    }
   
    const userExist=await User.findOne({ email });
    if(!userExist){
        return res.status(400).json({
            success: false,
            error: "User not found"
        }); 
    }
    const isMatch = await userExist.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Incorrect password",
      });
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
 

  })
module.exports = { allUsers, registerUser ,loginUser};