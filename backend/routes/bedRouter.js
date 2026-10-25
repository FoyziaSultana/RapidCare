const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddlewareForaccess");
const { createBed, viewBeds } = require("../controllers/bedController");

router.post("/create", authMiddleware, permissionMiddleware("create_bed"),createBed);
router.get("/view", authMiddleware, permissionMiddleware("view_bed"), viewBeds);

module.exports = router;