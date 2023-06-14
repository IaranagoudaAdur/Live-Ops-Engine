const userModel = require("../Models/user.model");
const Bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken")

exports.signup = (req, res) => {
    const salt = 10;
    Bcrypt.genSalt(salt, (saltErr, saltValue) => {
        if (saltErr) {
            console.log(saltValue)
            res.status(401).json({ error: "Unable to process s: " + saltErr });
        } else {
            Bcrypt.hash(req.body.password, saltValue, (hashErr, hashValue) => {
                if (hashErr) {
                    res.status(401).json({ error: "Unable to process d: " + hashErr });
                } else {
                    const newUser = new userModel({
                        username: req.body.username,
                        password: hashValue,
                        Email: req.body.Email,
                        Mobile: req.body.Mobile
                    });
                    newUser.save()
                        .then(data => {
                            res.status(200).send(data);
                        })
                        .catch(err => {
                            res.status(400).send("Unable to signup: " + err);
                        });
                }
            });
        }
    });
};

exports.signin = (req, res) => {
    const userData = req.body;
    userModel.findOne({username:userData.username}).then(user=>{
        if(!user){
            res.status(400).send({message:"User not found"})
        }else{
            if(!Bcrypt.compareSync(userData.password,user.password)){
                res.status(400).send({message:"password not matched"})
            }else{
                jwt.sign(user.toJSON(),"alalalaala",{expiresIn:"1hr"},(err,token)=>{
                    if(token){
                        res.status(200).send({message:token})
                    }else{
                        res.status(400).send({message:"jwt error"})
                    }
                })
            }
        }
    }).catch(err=>{
        res.status(400).send({message:"Error while finding user"})
    })
}
