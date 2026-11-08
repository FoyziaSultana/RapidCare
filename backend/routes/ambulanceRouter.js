const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddlewareForaccess");
const { addAmbulance, updateAmbulance } = require("../controllers/ambulanceController");

router.post("/add", authMiddleware, permissionMiddleware("add_ambulance"), addAmbulance);
router.put("/update/:ambulanceId", authMiddleware, permissionMiddleware("update_ambulance", updateAmbulance));
router.delete("/delete/:ambulanceId", authMiddleware, permissionMiddleware("delete_ambulance"));

module.exports = router;