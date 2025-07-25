const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.use(express.static(path.join(__dirname,"/public")));
app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));
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

//new route
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});

//create route
app.post("/listings", async(req,res)=>{
    //let{title,description,image,location,country} = req.body;
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

//edit route
app.get("/listings/:id/edit", async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

//update route
app.put("/listings/:id", async(req,res)=>{
    let{id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//delete route
app.delete("/listings/:id", async(req,res)=>{
    let{id} = req.params;
    let deletedPost = await Listing.findByIdAndDelete(id);
    console.log(deletedPost);
    res.redirect("/listings");
})
