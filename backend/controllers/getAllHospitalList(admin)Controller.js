const HospitalModel = require("../models/HospitalRegisterModel");
const UserModel = require("../models/userSchema");
const updateHospitalStatus = async (req, res) => {

    try {

        const { hospitalId } = req.params;
        const { status } = req.body;


        if (status !== "approved" && status !== "rejected") {
            return res.status(400).json({ message: "Invalid status!", success: false });
        }


        const hospital = await HospitalModel.findById(hospitalId);


        if (!hospital) {
            return res.status(404).json({
                message: "Hospital not found!",
                success: false
            });
        }
        if (status === "approved") {

            const existingUser = await UserModel.findOne({
                UserEmail: hospital.hospitalManagerEmail
            });

            if (existingUser) {
                return res.status(409).json({
                    message: "Manager email already exists!", success: false
                });
            }

            const newUser = new UserModel({
                UserName: hospital.hospitalManagerName,
                UserEmail: hospital.hospitalManagerEmail,
                UserPhone: hospital.hospitalManagerPhone,
                UserPassword: hospital.hospitalManagerPassword,
                roles: [],
                hospitalId: hospital._id
            });

            await newUser.save();
        }

        hospital.status = status;

        hospital.updatedAt = Date.now();

        await hospital.save();

        res.status(200).json({
            message: `Hospital ${status} successfully`,
            success: true
        });

    }
    catch (error) {
        console.error("Hospital Status Update Error:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};




const getAllHospitals = async (req, res) => {

    try {

        const hospitals = await HospitalModel.find();

        res.status(200).json({
            message: "Hospitals fetched successfully",
            success: true,
            hospitals
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
            success: false
        });

    }

};




const updateHospital = async (req, res) => {

    try {

        const { hospitalId } = req.params;

        const {
            hospitalName,
            hospitalLicence,
            hospitalType,
            hospitalEmail,
            hospitalPhone,
            hospitalAddress,
            latitude,
            longitude
        } = req.body;


        const hospital = await HospitalModel.findById(hospitalId);


        if (!hospital) {
            return res.status(404).json({
                message: "Hospital not found!",
                success: false
            });
        }


        hospital.hospitalName = hospitalName;
        hospital.hospitalLicence = hospitalLicence;
        hospital.hospitalType = hospitalType;
        hospital.hospitalEmail = hospitalEmail;
        hospital.hospitalPhone = hospitalPhone;
        hospital.hospitalAddress = hospitalAddress;


        hospital.hospitalLocation = {
            type: "Point",
            coordinates: [
                Number(longitude),
                Number(latitude)
            ]
        };


        hospital.updatedAt = Date.now();


        await hospital.save();


        res.status(200).json({
            message: "Hospital updated successfully",
            success: true
        });

    }

    catch (error) {

        res.status(500).json({
            message: "Server error",
            success: false
        });

    }

};




const deleteHospital = async (req, res) => {

    try {

        const { hospitalId } = req.params;

        const hospital = await HospitalModel.findById(hospitalId);

        if (!hospital) {
            return res.status(404).json({
                message: "Hospital not found!", success: false
            });
        }

        await HospitalModel.findByIdAndDelete(hospitalId);

        res.status(200).json({
            message: "Hospital deleted successfully",
            success: true
        });

    }
    catch (error) {

        res.status(500).json({ message: "Server error", success: false });
    }

};



module.exports = { getAllHospitals, updateHospitalStatus, updateHospital, deleteHospital };