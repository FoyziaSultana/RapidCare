const UserModel = require("../models/userSchema");

const permissionMiddleware = (permissionName) => {

    return async (req, res, next) => {
        try {

            const userId = req.user._id;

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

            let hasPermission = false;

            user.roles.forEach((role) => {

                role.permissions.forEach((permission) => {

                    if (permission.permissionName === permissionName) {
                        hasPermission = true;
                    }

                });

            });

            if (!hasPermission) {
                return res.status(403).json({
                    message: "You don't have permission!",
                    success: false
                });
            }

            next();

        }
        catch (error) {
            res.status(500).json({
                message: "Server error",
                success: false
            });
        }
    };
};

module.exports = permissionMiddleware;