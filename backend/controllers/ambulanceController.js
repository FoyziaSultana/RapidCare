const AmbulanceModel = require('../models/ambulanceModel');
const UserModel = require("../models/userSchema");
const addAmbulance = async (req, res) => {
    try {
        const { vehicalNumber, ambulanceDriverName, ambulanceDriverPhone } = req.body;
        const user = await UserModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                message: "User not found!", success: false
            });
        }
        const hospitalId = user.hospitalId;
        if (!hospitalId) {
            return res.status(403).json({
                message: "You are not assigned to any hospital!", success: false
            });
        }

        const ambulance = new AmbulanceModel({ vehicalNumber, ambulanceDriverName, ambulanceDriverPhone });
        await ambulance.save();
        res.status(200).json({
            message: "Ambulance added succesfully.", success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            message: "Server error!", success: false
        });
    }

}
module.exports = {addAmbulance};
