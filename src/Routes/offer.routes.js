const express=require("express");
const router=express.Router();
const offerController=require("../Controllers/offer.controller")
const getToken=require("../Controllers/getToken")

router.post("/get",offerController.getAll)
router.post("/create",getToken,offerController.create)
router.put("/update/:id",getToken,offerController.update)
router.delete("/delete/:id",getToken,offerController.delete)

module.exports=router 