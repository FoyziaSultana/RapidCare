
const BloodModel = require("../models/bloodModel");
const UserModel = require("../models/userSchema");
const HospitalModel = require("../models/HospitalRegisterModel");

const addBlood = async (req, res) => {

    try {

        const { bloodGroup, totalBags, availableBags, hospitalId } = req.body;

        const user = await UserModel.findById(req.user._id).populate("roles", "roleName");

        if (!user) {
            return res.status(404).json({ message: "User not found!", success: false });
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
                return res.status(403).json({ message: "You are not assigned to any hospital!", success: false});
            }
        }

        const hospital = await HospitalModel.findById(selectedHospitalId);

        if (!hospital || hospital.status !== "approved") {
            return res.status(404).json({ message: "Hospital isn't found!", success: false });
        }

        if (!Number.isInteger(Number(totalBags)) || !Number.isInteger(Number(availableBags)) || Number(totalBags) < 0 || Number(availableBags) < 0 || Number(availableBags) > Number(totalBags) ) {
            return res.status(400).json({ message: "Please enter valid blood bag numbers!", success: false });
        }

        const blood = new BloodModel({ hospitalId: selectedHospitalId, bloodGroup, totalBags: Number(totalBags), availableBags: Number(availableBags) });

        await blood.save();

        res.status(200).json({ message: "Blood added successfully!", success: true });

    }
    catch (error) {
        res.status(500).json({ message: "Server error!", success: false });
    }

};

const getAllBlood = async (req, res) => {
    try {
        const bloods = await BloodModel.find().populate("hospitalId", "hospitalName");

        return res.status(200).json({ success: true, message: "Blood information fetched successfully!", bloods });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error!" });
    }
};


module.exports = { addBlood, getAllBlood};
