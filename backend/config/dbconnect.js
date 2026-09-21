
// require mongoose to use mongodb
const  mongoose = require("mongoose");

// import config to use mongoDB url
const config = require("./serverport");


// dbURL contain mongoDB atlas url
const dbURL = config.db.url;

mongoose.connect(dbURL)
.then(()=>{
    console.log('mongodb atlas is connected');
})
.catch((error)=>
{
    console.log(error);
    process.exit(1);
});

