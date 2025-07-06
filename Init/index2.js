const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");

const Mongo_URL = "mongodb://127.0.0.1:27017/wandertales";
async function main(){
    await mongoose.connect(Mongo_URL);
}
main().then(()=>{
    console.log("Connected to DB");
}).catch(err =>{
    console.log(err);
});

async function main(){
    await mongoose.connect(Mongo_URL);
};

const initDB = async ()=>{
    await listing.deleteMany({});
    await listing.insertMany(initData.data);
    console.log("data was initialized!");
};

initDB();