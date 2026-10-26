
const mongoose = require("mongoose");
const config = require("./serverport");

const dbURL = config.db.url;

const dbconnect = async () => {
    try {
        await mongoose.connect(dbURL);
        console.log("MongoDB Atlas is connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

module.exports = dbconnect;
