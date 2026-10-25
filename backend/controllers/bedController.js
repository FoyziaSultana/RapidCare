const BedModel = require('../models/hospitalBedModel');
const UserModel = require("../models/userSchema");
const createBed = async(req,res)=>{
    try{
        const { bedType, totalBeds, availableBeds } = req.body;
        const user = await UserModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found!", success: false
            });
        }
        const hospitalId = user.hospitalId;
        if(!hospitalId)
        {
            return res.status(403).json({
                message:"You are not assigned to any hospital!", success: false
            });
        }

        if(availableBeds > totalBeds)
        {
            return res.status(403).json({
                message:"Available beds can not exceed total beds!", success: false
            });
        }
        const occupiedBeds = totalBeds - availableBeds;

        const bed = new BedModel ({ hospitalId, bedType, totalBeds, occupiedBeds, availableBeds });
        await bed.save();
        res.status(200).json({
            message: "Bed created succesfully.", success: true
        });

    } catch(error)
    {
        console.log(error);
        res.status(500).json({
            
            message:"Server error!", success:false
        });
    }

}



const viewBeds = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found!", success: false
            });
        }

        const hospitalId = user.hospitalId;
        if (!hospitalId) {
            return res.status(403).json({
                message: "You are not assigned to any hospital!", success: false
            });
        }

        const beds = await BedModel.find({ hospitalId: hospitalId });

        return res.status(200).json({
            message: "Beds information fetched successfully.", success: true, beds: beds
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error", success: false
        });
    }
};

module.exports = { createBed, viewBeds  };