const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddlewareForaccess");
const { createBed, viewBeds, updateBed, deleteBed } = require("../controllers/bedController");

router.post("/create", authMiddleware, permissionMiddleware("create_bed"),createBed);
router.get("/view", authMiddleware, permissionMiddleware("view_bed"), viewBeds);
router.put("/update/:bedId", authMiddleware, permissionMiddleware("update_bed"), updateBed);
router.delete("/delete/:bedId", authMiddleware, permissionMiddleware("delete_bed"),deleteBed);
module.exports = router;