const UserModel = require("../models/userSchema");

const getUserPermissions = async (req, res) => {
    try {

        const userId  =  req.user._id;

        const user = await UserModel.findById(userId)
            .populate({
                path: "roles",
                populate: {
                    path: "permissions",
                    model: "Permissions"
                }
            });

        if (!user) {
            return res.status(404).json({
                message: "User not found!",
                success: false
            });
        }

        let permissions = [];

        user.roles.forEach((role) => {

            role.permissions.forEach((permission) => {

                if (!permissions.includes(permission.permissionName)) {
                    permissions.push(permission.permissionName);
                }

            });

        });

        res.status(200).json({
            success: true, permissions
        });

    }
    catch (error) {
        res.status(500).json({
            message: "Server error", success: false
        });
    }
}

module.exports = { getUserPermissions };