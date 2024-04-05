const express=require("express");
const passport=require("passport");
const router=express.Router();
const Skill=require("../models/Skill");


router.post(
    "/create",
    passport.authenticate("jwt",{session:false}),
    async (req,res)=>{
        const user=req.user;

        //Create skill object
        const {skillName}=req.body;
        if(!skillName){
            return res.status(402).json({err:"Invalid details"});
        }
        const skillObj={
            skillName
        }
        const createdSkill=await Skill.create(skillObj);

        //add skill to user
        user.skills.push(createdSkill._id);
        await user.save();

        //return a result to user
        return res.status(200).json(createdSkill);
    }
);

module.exports=router;