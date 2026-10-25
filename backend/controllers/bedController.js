const BedModel = require('../models/hospitalBedModel');

const createBed = async(req,res)=>{
    try{
        const { bedType, totalBeds, availableBeds } = req.body;
        const hospitalId = req.user.hospitalId;
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
        res.status(500).json({
            message:"Server error!", success:false
        });
    }

}
module.exports = { createBed };