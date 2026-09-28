const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roleSchema = new Schema({

    roleName: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String
    },

    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permissions"
    }],

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }

});

const roleModel = mongoose.model("Roles", roleSchema);

module.exports = roleModel;