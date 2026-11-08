const HospitalModel = require("../models/HospitalRegisterModel");
const BedModel = require("../models/hospitalBedModel");
const AmbulanceModel = require("../models/ambulanceModel");

const getApprovedHospitals = async (req, res) => {

    try {

        const hospitals = await HospitalModel.find({
            status: "approved"
        });

        const hospitalList = await Promise.all(

            hospitals.map(async (hospital) => {

                const beds = await BedModel.find({
                    hospitalId: hospital._id
                });

                const ambulances = await AmbulanceModel.countDocuments({
                    hospitalId: hospital._id
                });

                const bedInfo = {
                    General: 0,
                    Cabin: 0,
                    ICU: 0,
                    NICU: 0,
                    CCU: 0
                };

                beds.forEach((bed) => {

                    bedInfo[bed.bedType] += bed.availableBeds;

                });

                return {
                    _id: hospital._id,
                    hospitalName: hospital.hospitalName,
                    hospitalType: hospital.hospitalType,
                    hospitalAddress: hospital.hospitalAddress,
                    hospitalPhone: hospital.hospitalPhone,
                    bedInfo,
                    ambulances
                };

            })

        );

        return res.status(200).json({
            message: "Approved hospitals fetched successfully!",
            success: true,
            hospitals: hospitalList
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server error!",
            success: false
        });

    }

};

module.exports = { getApprovedHospitals };