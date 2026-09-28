const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const permissionSchema = new Schema({

    permissionName: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String
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

const permissionModel = mongoose.model("Permissions", permissionSchema);

module.exports = permissionModel;