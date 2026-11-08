
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloodSchema = new Schema({

    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HospitalInformations",
        required: true
    },

    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        required: true
    },

    totalBags: {
        type: Number,
        required: true,
        min: 0
    },

    availableBags: {
        type: Number,
        required: true,
        min: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }

});

const BloodModel = mongoose.model("bloods", bloodSchema);

module.exports = BloodModel;
