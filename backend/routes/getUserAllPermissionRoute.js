const express = require("express");

const router = express.Router();

const { getUserPermissions } = require("../controllers/getUserAllPermission");

const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddlewareForaccess");


router.get('/permissions', authMiddleware, getUserPermissions);

router.get('/checkPermission', authMiddleware, permissionMiddleware("view_bed"), (req, res) => {
    res.status(200).json({
        message: "You have view_bed permission!",
        success: true
    });
}
);
module.exports = router;