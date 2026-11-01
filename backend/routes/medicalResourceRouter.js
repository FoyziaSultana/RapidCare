const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddlewareForaccess");
const { createMedicalResource, viewMedicalResources, updateMedicalResource, deleteMedicalResource, } = require("../controllers/medicalResourceController");


router.post("/create", authMiddleware, permissionMiddleware("create_medical_resource"),createMedicalResource);
router.get("/view", authMiddleware, permissionMiddleware("view_medical_resource"), viewMedicalResources);
router.put("/update/:medicalResourceId", authMiddleware, permissionMiddleware("update_medical_resource"), updateMedicalResource);
router.delete("/delete/:medicalResourceId", authMiddleware, permissionMiddleware("delete_medical_resource"),deleteMedicalResource);
module.exports = router;