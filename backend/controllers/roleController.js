const roleModel = require("../models/roleModel");
const permissionModel = require("../models/permissionModel");

const createRole = async (req, res) => {
    try {

        const { roleName, description, permissions } = req.body;

        const role = await roleModel.findOne({ roleName });

        if (role) {
            return res.status(409).json({
                message: "Role already exists!",
                success: false
            });
        }

        const permissionData = await permissionModel.find({
            _id: { $in: permissions }
        });

        if (permissionData.length !== permissions.length) {
            return res.status(400).json({
                message: "Permissions are not valid!",
                success: false
            });
        }

        const newRole = new roleModel({ roleName, description, permissions });

        await newRole.save();

        res.status(201).json({
            message: "Role created successfully",
            success: true
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error", success: false
        });
    }
}

module.exports = { createRole };