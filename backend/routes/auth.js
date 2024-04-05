const express=require('express');
const User=require("../models/User");
const bcrypt=require('bcrypt');
const {getToken}=require("../utils/helpers");
const router=express.Router();
router.post("/register",async(req,res)=>{
    //This is the function that will handle the register user
    //step1: Get the details from req.body
    const {firstName,lastName,email,password}=req.body;

    if(!firstName || !email || !password){
        return res.status(400).json({err:"Invalid request body"});
    }
    //step2: We will check if a user with that email already exists.This is not allowed
    const existingUser=await User.findOne({email:email});
    if(existingUser){
        return res.status(402).json({err:"A user with this email already exists"});
    }
    //step3: This is a legitimate user request. Now we will create the user.
    const hashedPassword=await bcrypt.hash(password, 10);
    const newUserDetails={
        firstName,
        lastName,
        password:hashedPassword,
        email,
    };
    const newUser=await User.create(newUserDetails);

    //step4: I can use the newUser to create a JWT and return the token to the user.
    const token=await getToken(email,newUser);
    //We want to return the following to the user:
    //1. The actual user created.
    //2. The token\
    const userToReturn={...newUser.toJSON(),token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

router.post("/login",async(req,res)=>{
    //step1: We get the details from the req.body
    const {email,password}=req.body;

    //step2: Verify if a user exists with that email
    const user=await User.findOne({email: email});
    if(!user){
        return res.status(401).json({err:"Invalid username or password"});
    }

    //step3: Verify if the password provided by the user for login is correct.
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(401).json({err:"Invalid username or password"});
    }

    //step4: Generate a token for the user and return it.
    
    const token=await getToken(email,user);
    const userToReturn={...user.toJSON(),token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

module.exports=router;
