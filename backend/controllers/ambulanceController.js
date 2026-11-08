const AmbulanceModel = require('../models/ambulanceModel');
const UserModel = require("../models/userSchema");
const HospitalModel = require("../models/HospitalRegisterModel");
const addAmbulance = async (req, res) => {
    try {
        const { vehicalNumber, ambulanceDriverName, ambulanceDriverPhone, hospitalId } = req.body;
        const user = await UserModel.findById(req.user._id).populate("roles", "roleName");
        if (!user) {
            return res.status(404).json({
                message: "User not found!", success: false
            });
        }
        const isAdmin = user.roles.some(
            role => role.roleName.toLowerCase().trim() === "admin"
        );
        let selectedHospitalId;
        if (isAdmin) {
            selectedHospitalId = hospitalId;

            if (!selectedHospitalId) {
                return res.status(400).json({ message: "Please select a hospital!", success: false });
            }
        }
        else {
            selectedHospitalId = user.hospitalId;

            if (!selectedHospitalId) {
                return res.status(403).json({ message: "You are not assigned to any hospital!", success: false });
            }
        }
        const hospital = await HospitalModel.findById(selectedHospitalId);
        if (!hospital || hospital.status !== "approved") {
            return res.status(404).json({
                message: "Approved hospital not found!",
                success: false
            });
        }

        const ambulance = new AmbulanceModel({ hospitalId: selectedHospitalId, vehicalNumber, ambulanceDriverName, ambulanceDriverPhone });
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

const getAllAmbulance = async (req, res) => {
    try {
        const ambulances = await AmbulanceModel.find().populate("hospitalId", "hospitalName");

        return res.status(200).json({
            success: true, ambulances
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false, message: "Failed to get ambulances"
        });
    }
};

const updateAmbulance = async (req, res) => {
    try {
        const { ambulanceId } = req.params;
        const { vehicalNumber, ambulanceDriverName, ambulanceDriverPhone } = req.body;
        const user = await UserModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found!", success: false });
        }

        if (!user.hospitalId) {
            return res.status(403).json({ message: "You are not assigned to any hospital!", success: false });
        }

        const ambulance = await AmbulanceModel.findOne({
            _id: ambulanceId,
            hospitalId: user.hospitalId
        });

        if (!ambulance) {
            return res.status(404).json({ message: "Ambulance is not found!", success: false });
        }

        ambulance.vehicalNumber = vehicalNumber;
        ambulance.ambulanceDriverName = ambulanceDriverName;
        ambulance.ambulanceDriverPhone = ambulanceDriverPhone;
        await ambulance.save();

        res.status(200).json({
            message: "Information updated successfully!",
            success: true,
            ambulance
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
};

const deleteAmbulance = async (req, res) => {
    try {

        const { ambulanceId } = req.params;

        const user = await UserModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found!", success: false });
        }

        if (!user.hospitalId) {
            return res.status(403).json({ message: "You are not assigned to any hospital!", success: false });
        }

        const ambulance = await AmbulanceModel.findOne({
            _id: ambulanceId,
            hospitalId: user.hospitalId
        });

        if (!ambulance) {
            return res.status(404).json({ message: "Ambulance not found!", success: false });
        }

        await AmbulanceModel.findByIdAndDelete(ambulanceId);

        res.status(200).json({ message: "Ambulance deleted successfully!", success: true });

    } catch (error) {
        res.status(500).json({ message: "Server error!", success: false });
    }
};
module.exports = { addAmbulance, getAllAmbulance, updateAmbulance, deleteAmbulance };
