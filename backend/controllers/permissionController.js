const permissionModel = require("../models/permissionModel");

const createPermission = async (req, res) => {
    try {

        const { permissionName, description } = req.body;

        const permission = await permissionModel.findOne({ permissionName });

        if (permission) {
            return res.status(409).json({
                message: "Permission already exists!",
                success: false
            });
        }

        const newPermission = new permissionModel({ permissionName, description });

        await newPermission.save();

        res.status(201).json({
            message: "Permission created successfully", success: true
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error", success: false
        });
    }
}

module.exports = { createPermission };