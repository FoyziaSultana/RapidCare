const medicalResourceModel = require('../models/medicalResourceModel');
const UserModel = require("../models/userSchema");
const createMedicalResource = async (req, res) => {
    try {
        const { medicalResourceName, totalMedicalResource, availableMedicalResource } = req.body;
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

        if (availableMedicalResource > totalMedicalResource) {
            return res.status(403).json({
                message: "Available medical resource can not exceed total resources!", success: false
            });
        }
        const occupiedMedicalResource = totalMedicalResource - availableMedicalResource;

        const medicalResource = new BedModel({ hospitalId, medicalResourceName, totalMedicalResource, occupiedMedicalResource, availableMedicalResource });
        await medicalResource.save();
        res.status(200).json({
            message: "Medical resource created successfully.", success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            message: "Server error!", success: false
        });
    }

}




module.exports = { createMedicalResource};