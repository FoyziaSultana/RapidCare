const express = require("express");

const router = express.Router();

const { getAllHospitals, updateHospitalStatus, updateHospital } = require("../controllers/getAllHospitalList(admin)Controller");

const authMiddleware = require("../middleware/authMiddleware");


const permissionMiddleware = require("../middleware/permissionMiddlewareForaccess");

//  show All hospital List
router.get("/hospitals", authMiddleware, permissionMiddleware("view_hospital"), getAllHospitals );


// update hospital status pending to accept or reject
router.patch("/hospitals/:hospitalId/status", authMiddleware, permissionMiddleware("manage_hospital"),
updateHospitalStatus );


//Update hosiptal information
router.patch("/hospitals/:hospitalId",authMiddleware,permissionMiddleware("manage_hospital"),
    updateHospital
);

module.exports = router;