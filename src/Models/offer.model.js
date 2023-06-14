const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
    offer_id: String,
    offer_title: String,
    offer_description: String,
    offer_image: String,
    offer_sort_order: Number,
    content: Array,
    schedule: Object,
    target: String,
    pricing: Array,
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

const offerModel = mongoose.model("offer", offerSchema);

module.exports = offerModel