
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

const updateBlood = async (req, res) => {
    try {
        const { bloodId } = req.params;
        const { bloodGroup, totalBags, availableBags } = req.body;

        const user = await UserModel.findById(req.user._id).populate("roles", "roleName");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        const isAdmin = user.roles.some(
            role => role.roleName.toLowerCase().trim() === "admin"
        );

        let filter = { _id: bloodId };

        if (!isAdmin) {
            if (!user.hospitalId) {
                return res.status(403).json({ success: false, message: "You are not assigned to any hospital!" });
            }

            filter.hospitalId = user.hospitalId;
        }

        const blood = await BloodModel.findOne(filter);

        if (!blood) {
            return res.status(404).json({ success: false, message: "Blood information not found!" });
        }

        if (!bloodGroup || !["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(bloodGroup)) {
            return res.status(400).json({ success: false, message: "Invalid blood group!"});
        }

        if ( !Number.isInteger(Number(totalBags)) || !Number.isInteger(Number(availableBags)) || Number(totalBags) < 0 || Number(availableBags) < 0 || Number(availableBags) > Number(totalBags) ) {
            return res.status(400).json({ success: false, message: "Invalid blood bag information!"
            });
        }

        blood.bloodGroup = bloodGroup;
        blood.totalBags = Number(totalBags);
        blood.availableBags = Number(availableBags);
        blood.updatedAt = Date.now();

        await blood.save();

        return res.status(200).json({success: true, message: "Blood information updated successfully!", blood });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


const deleteBlood = async (req, res) => {
    try {
        const { bloodId } = req.params;

        const user = await UserModel.findById(req.user._id).populate("roles", "roleName");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!"});
        }

        const isAdmin = user.roles.some(
            role => role.roleName.toLowerCase().trim() === "admin"
        );

        let filter = { _id: bloodId };

        if (!isAdmin) {
            if (!user.hospitalId) {
                return res.status(403).json({ success: false, message: "You are not assigned to any hospital!"});
            }

            filter.hospitalId = user.hospitalId;
        }

        const blood = await BloodModel.findOneAndDelete(filter);

        if (!blood) {
            return res.status(404).json({ success: false, message: "Blood information not found!" });
        }

        return res.status(200).json({ success: true, message: "Blood information deleted successfully!" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
};
module.exports = { addBlood, getAllBlood, updateBlood, deleteBlood};
