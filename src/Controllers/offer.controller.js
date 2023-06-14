const offerModel = require("../Models/offer.model");

exports.getAll = (req, res) => {
    const validOffers=[]
    offerModel.find().then(offers=>{
        offers.filter((offer)=>{
            const rules=offer.target.split("and")
            rules.forEach(rule=>{
                let ruleKey=null
                if(rule.includes(">")){
                    ruleKey= {key:rule.trim().split(">")[0].trim(),value:parseInt(rule.trim().split(">")[1])}
                    if(req.body[ruleKey.key] > ruleKey.value){
                        console.log(req.body[ruleKey.key], ruleKey.value)
                        validOffers.push(offer)
                    }
                }else{
                    ruleKey= {key:rule.trim().split("<")[0].trim(),value:parseInt(rule.trim().split("<")[1])}
                    if(req.body[ruleKey.key] < ruleKey.value){
                        console.log(req.body[ruleKey.key], ruleKey.value)
                        validOffers.push(offer)
                    }
                }
            })
        })
        res.status(200).send({message:validOffers})
    }).catch(err=>{
        res.status(500).send("Internal server error",err)
    })
};

exports.create = (req, res) => {
    const offerData = req.body;
    const newOffer = new offerModel({
        ...offerData,
        userid: req.user._id,
    });
    newOffer 
        .save()
        .then((data) => {
            res
                .status(200) 
                .send({ message: "Created offer", data: data });
        })
        .catch((err) => {
            res
                .status(400)
                .send({ message: "Error while creating offer" });
        });
};

exports.update = (req, res) => {
    const userid = req.user._id;
    const updateid = req.params.id;
    offerModel
        .findOneAndUpdate({ _id: updateid, userid }, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res
                    .status(400)
                    .send({ message: "Error while updating" });
            } else {
                res
                    .status(200)
                    .send({ message: "Updated offer", offer: data });
            }
        })
        .catch((err) => {
            res
                .status(400)
                .send({ message: "Error while updating", err });
        });
};

exports.delete = (req, res) => {
    const userid = req.user._id;
    const deleteid = req.params.id;
    offerModel
        .findOneAndDelete({ _id: deleteid, userid })
        .then((data) => {
            if (!data) {
                res
                    .status(400)
                    .send({ message: "Error while deleting" });
            } else {
                res
                    .status(200)
                    .send({ message: "Deleted offer" });
            }
        })
        .catch((err) => {
            res
                .status(400)
                .send({ message: "Error while deleting", err });
        });
};
