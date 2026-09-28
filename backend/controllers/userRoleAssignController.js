const userModel = require("../models/userSchema");
const roleModel = require("../models/roleModel");

const rolesAssignToUser = async (req, res) => {
    try {

        const { userId, roles } = req.body;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found!",
                success: false
            });
        }

        const roleData = await roleModel.find({
            _id: { $in: roles }
        });

        if (roleData.length !== roles.length) {
            return res.status(400).json({
                message: "Roles are not valid!",
                success: false
            });
        }

        user.roles = roles;

        await user.save();

        res.status(200).json({
            message: "Roles assigned successfully",
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
}

module.exports = { rolesAssignToUser };