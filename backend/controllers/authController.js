const UserModel = require("../models/userSchema");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signUp = async(req,res)=>{
try{
const {UserName, UserEmail, UserPhone, UserPassword} = req.body;
const user = await UserModel.findOne({UserEmail});
if(user)
{
    return res.status(409).json({message:'User alreasdy exists!', success:false});
}

const userModel = new UserModel({UserName, UserEmail, UserPhone, UserPassword});
userModel.UserPassword = await bcrypt.hash(UserPassword, 10);
await userModel.save();
res.status(201).json({message:"SignUp successful", success:true});
}
catch(err)
{
res.status(500).json({message:"Server error", success:false});
}
}

const login = async(req,res)=>{
try{
const { UserEmail, UserPassword} = req.body;
const user = await UserModel.findOne({UserEmail});
if(!user)
{
    return res.status(403).json({message:'Authentication failed!', success:false});
}

const isUserPasswordEqual = await bcrypt.compare(UserPassword,user.UserPassword);
if(!isUserPasswordEqual)
{
    return res.status(403).json({message:"Password doesn't match!", success:false});
}

const jwtToken = jwt.sign({UserEmail: user.UserEmail, _id:user._id},
    process.env.JWT_SECRET_KEY,
    {expiresIn:'24h'}
)

res.status(200).json({message:"Login successful", success:true, jwtToken, UserEmail, UserName: user.UserName});
}
catch(err)
{
res.status(500).json({message:"Server error", success:false});
}
}

module.exports = {signUp, login}