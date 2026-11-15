const express = require("express");
const { getApprovedHospitals, getHospitalDetails } = require("../controllers/hospitalCardController");
const router = express.Router();

router.get("/approved", getApprovedHospitals);
router.get("/approved/:hospitalId", getHospitalDetails);
module.exports = router;