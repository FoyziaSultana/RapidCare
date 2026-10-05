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

const addPermissionToRole = async (req, res) => {
    try {

        const { roleId, permissionId } = req.body;

        const role = await roleModel.findById(roleId);

        if (!role) {
            return res.status(404).json({
                message: "Role not found!",
                success: false
            });
        }

        const permission = await permissionModel.findById(permissionId);

        if (!permission) {
            return res.status(404).json({
                message: "Permission not found!",
                success: false
            });
        }

        if (role.permissions.includes(permissionId)) {
            return res.status(409).json({
                message: "Permission already assigned!",
                success: false
            });
        }

        role.permissions.push(permissionId);

        await role.save();

        res.status(200).json({
            message: "Permission added to role successfully",
            success: true
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


module.exports = { createRole,  addPermissionToRole };