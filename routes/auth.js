const router=require("express").Router();
const User=require("../models/User");
const CryptoJS=require("crypto.js");
const jwt=require("jsonwebtoken");
//register
router.post("/register",async(req,res)=>{
    const newUser= new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password),
    });
    try{
    const savedUser=await newUser.save();
    res.status(201).json(savedUser);
    }catch(error){
        res.status(500).json(error)
    }


});

router.post("/login",async(req,res)=>{
    try{
        const user=await User.findOne({username:req.body.username})
        
        !user && res.status(401).json("wrong credentials")
        const hashedpassword=CryptoJS.AES.decrypt(user.password);
         const OriginalPassword=hashedpassword.toString(CyptoJS.enc.utf8);
         OriginalPassword!=req.body.password &&
        res.status(401).json("wrong credentials")

        const accessToke=jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin,
        },{expiresIn="3d"})

        const {password,...others}=user._doc;
        res.status(200).json(others);


        }catch(error){
        res.status(500).json(error)
    }
})

module.exports=router