const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
    hospitalName: {
        type: String,
        required: true
    },
    hospitalLicence: {
        type: String,
        required: true,
        unique: true
    },
    hospitalType: {
        type: String,
        required: true

    },
    hospitalEmail: {
        type: String,
        required: true,
        unique: true
    },
    hospitalPhone: {
        type: String,
        required: true
    },
    hospitalAddress: {
        type: String,
        required: true
    },
    hospitalLocation: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },

        coordinates: {
            type: [Number],
            required: true
        }
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
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
hospitalSchema.index({ hospitalLocation: "2dsphere" });

const HospitalModel = mongoose.model("HospitalInformations", hospitalSchema);
module.exports = HospitalModel;