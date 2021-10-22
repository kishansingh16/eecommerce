const jwt=requires("jsonwebtoken");

const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.token
    if(authHeader){
         jwt.verify(token,(err,user)=>{
             if(err)res.status(403).json("token is not valid");
             req.user=user;
             next();
         })
    }else{
        return res.status(401).json("not authenticaton")
    }
}
const verifyTokenAuthenticator=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.is || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("you are not allowed to do that")
        }
    })
}
module.exports={verifyToken}