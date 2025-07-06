const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description: String,
    image:{
        type:String,
        Set:(v)=>v===""?"https://unsplash.com/photos/brown-wooden-road-sign-during-daytime-wGu1pzDSm3g":v,
    },
    location:String,
    country:String,
    like:Boolean,
});

const listing = mongoose.model("listing",listingSchema);
module.exports=listing;