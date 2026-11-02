const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const medicalResourceSchema = new Schema({

    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HospitalInformations",
        required: true
    },
    medicalResourceName: {
        type: String,
        required: true,
        enum: ["Oxygen" , "Ventilator"]
    },

    totalMedicalResource: {
        type: Number,
        required: true,
        min: 0
    },

    occupiedMedicalResource: {
        type: Number,
        min: 0
    },

    availableMedicalResource: {
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

const medicalResourceModel = mongoose.model("medicalResources", medicalResourceSchema);

module.exports = medicalResourceModel;
