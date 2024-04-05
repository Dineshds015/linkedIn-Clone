const express=require('express');
const passport=require("passport");
const ExtractJwt=require("passport-jwt").ExtractJwt;
const JwtStrategy=require("passport-jwt").Strategy;
const mongoose=require("mongoose");
const authRoutes=require("./routes/auth");
const experienceRoutes=require("./routes/experience");
const skillRoutes=require("./routes/skill");
const projectRoutes=require("./routes/project");
const User=require("./models/User");

require("dotenv").config();
const app=express();
app.use(express.json());

//to connect to mongo from nodem we need to use mongoose.connect()
//It will take 2 arguments:1.connection string, 2.connection options
mongoose.connect("mongodb+srv://dineshds015:"+process.env.MONGO_PASSWORD+"@linkedinclone.uk8ogs8.mongodb.net/?retryWrites=true&w=majority&appName=LinkedInClone",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then((x)=>{
    console.log("Connected to mongo!");
}).catch((err)=>{
    console.log("Error occured while connecting to mongo");
    console.log(err);
});

//passport-jwt setup
let opts={};
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey="thisIsSupposedToBeSecret";
passport.use(new JwtStrategy(opts,async function(jwt_payload,done){
    try{
            const user=await User.findOne({_id:jwt_payload.identifier});
            
            if(user){
                done(null,user);
            }
            else{
                done(null,false);
            }
        }catch(err){
            if(err){
                done(err,false);
            }
        }
    })
);

app.get("/", (req,res)=>{
    res.send("i am working");
});

//app.use will take 2 arguments. First will be the prefix to the route. prefix ex: /auth /skills etc
app.use("/auth",authRoutes);
app.use("/experience",experienceRoutes);
app.use("/skill",skillRoutes);
app.use("/project",projectRoutes);

app.listen(8000, ()=>{
    console.log("Server running on port 8000");
});
