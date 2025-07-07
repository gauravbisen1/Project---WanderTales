const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});

app.get("/", (req,res)=>{
    res.send("Root !");
});

//connect DB
const Mongo_URL = "mongodb://127.0.0.1:27017/wandertales";
async function main(){
    await mongoose.connect(Mongo_URL);
}
main().then(()=>{
    console.log("Connected to DB");
}).catch(err =>{
    console.log(err);
});

//index route
app.get("/listings", async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

//show route
app.get("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
})

