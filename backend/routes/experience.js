const express=require("express");
const passport=require("passport");
const router=express.Router();
const Experience=require("../models/Experience");

//A route to create experience
router.post("/create",
    passport.authenticate("jwt",{session:false}),
    async (req,res)=>{
        //1. Identify the user who is calling it.
            //Due to passport.authenticate, my req.user will get populated with the current user details.
        const user=req.user;
        //2. Create the experience object
        const {companyName,position,startDate,endDate,description}=req.body;
        if(!companyName || !position){
            return res.status(402).json({err:"Invalid Details"});
        }
        const experienceObj={
            companyName,
            position,
            startDate,
            endDate,
            description,
        };
        const experience=await Experience.create(experienceObj);
        //3. Add experience to user
        user.experiences.push(experience._id);
        await user.save();
        //4. Return a response
        return res.status(200).json(experience);
});

module.exports=router;