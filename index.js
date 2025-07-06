const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});

//api
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
