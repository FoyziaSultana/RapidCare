const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const permissionMiddleware = require("../middleware/permissionMiddlewareForaccess");

router.get('/dashboard', authMiddleware, permissionMiddleware("view_dashboard"), (req,res)=>{
    res.status(200).json({
        message: "Welcome to your Dashboard", success: true
    });
});

module.exports = router;