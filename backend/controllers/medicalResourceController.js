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

        const medicalResource = new medicalResourceModel({ hospitalId, medicalResourceName, totalMedicalResource, occupiedMedicalResource, availableMedicalResource });
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

const viewMedicalResources = async (req, res) => {
    try {
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

        const medicalResource = await medicalResourceModel.find({ hospitalId: hospitalId });

        return res.status(200).json({
            message: "Medical resource information fetched successfully.", success: true, medicalResource: medicalResource
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error", success: false
        });
    }
};

const updateMedicalResource = async (req, res) => {
    try {
        const { medicalResourceId } = req.params;
        const { medicalResourceName, totalMedicalResource, availableMedicalResource } = req.body;

        const medicalResource = await medicalResourceModel.findById(bedId);

        if (!medicalResource) {
            return res.status(404).json({ message: "This resource not found!", success: false });
        }

        medicalResource.medicalResourceName = medicalResourceName;
        medicalResource.totalMedicalResource = totalMedicalResource;
        medicalResource.availableMedicalResource = availableMedicalResource;
        const occupiedMedicalResource = totalMedicalResource - availableMedicalResource;
        medicalResource.occupiedMedicalResource = occupiedMedicalResource;
        await medicalResource.save();

        res.status(200).json({
            message: "Medical resource updated successfully!",
            success: true,
            medicalResource
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
};

const deleteMedicalResource = async (req, res) => {
    try {
        const { medicalResourceId } = req.params;

        const medicalResource = await medicalResourceModel.findById(medicalResourceId);

        if (!medicalResource) {
            return res.status(404).json({ message: "This resource not found!", success: false });
        }

        await medicalResourceModel.findByIdAndDelete(medicalResourceId);

        return res.status(200).json({ message: "Resource deleted successfully!", success: true });

    } catch (error) {
        return res.status(500).json({ message: "Server error", success: false });
    }
};

module.exports = { createMedicalResource, viewMedicalResources, updateMedicalResource, deleteMedicalResource};