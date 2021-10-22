const {verifyToken,verifyTokenAuthentication}=require("./verifyToken")
const router=require("express").Router();

router.put("/:id",verifyTokenAuthentication,(req,res)=>{
    if(req.body.password){
        req.body.password=CryptoJS.AES.encrypt(req.body.password).toString();
    
    }
    try{
        const updateUser=await User.findByAndUpdate(res.params.id,{
            $set:req.body
        },{new:true}
        );
        res.status(200).json(UpdatedUser);
    }catch(err){
        res.status(500).json(err);
    }
})
module.exports=router;