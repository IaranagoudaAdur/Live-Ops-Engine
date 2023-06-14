const jwt=require("jsonwebtoken");

module.exports=(req,res,next)=>{
    try{
        let parted=req.headers.authorization.split(" ");
        let token=parted[1];
        jwt.verify(token,"alalalaala",(err,data)=>{
            if(err){
                res.status(400).send({message:"verify error"})
            }else{
                req.user=data;
                next()
            }
        })
    }catch{
        res.status(500).send({
            message:"Authentication failed"
        })
    }
}