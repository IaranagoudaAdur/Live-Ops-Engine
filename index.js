require("dotenv").config()
const express=require("express");
const mongoose=require("mongoose");
const bodyparser=require("body-parser");
const userRoutes=require("./src/Routes/user.routes")
const offerRoutes=require("./src/Routes/offer.routes")
const app=express()

const PORT=process.env.PORT

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Connected to database")
}).catch((err)=>{
    console.log("Error while connecting to database ",err)
})

app.use(bodyparser.json())

app.listen(PORT,()=>{
    console.log("listening to port ",PORT)
})

app.use("/user",userRoutes)
app.use("/offer",offerRoutes)