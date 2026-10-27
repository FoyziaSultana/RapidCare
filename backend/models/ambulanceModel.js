const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ambulanceSchema = new Schema({

    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HospitalInformations",
        required: true
    },

    vehicalNumber: {
        type: String,
        required: true,
    },

    ambulanceDriverName: {
        type: String,
        required: true,
    },

    ambulanceDriverPhone: {
        type: String,
        required: true
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

const AmbulanceModel = mongoose.model("ambulances", ambulanceSchema);

module.exports = AmbulanceModel;
