const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    UserName : {
        type: String,
        required: true
    },
    UserEmail: {
        type: String,
        required: true,
        unique: true
    },
    UserPhone: {
        type: String,
        required: true
    },
    UserPassword: {
        type: String,
        required: true
    },
    roles:[{
        type:mongoose.Schema.ObjectId,
        ref:"Role"
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
const UserModel = mongoose.model("users",UserSchema) ;
module.exports = UserModel;