const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bedSchema = new Schema({

    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HospitalInformations",
        required: true
    },

    bedType: {
        type: String,
        required: true,
        enum: ["General", "Cabin", "ICU", "NICU", "CCU"]
    },

    totalBeds: {
        type: Number,
        required: true,
        min: 0
    },

    occupiedBeds: {
        type: Number,
        min: 0
    },

    availableBeds: {
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

const BedModel = mongoose.model("Beds", bedSchema);

module.exports = BedModel;
