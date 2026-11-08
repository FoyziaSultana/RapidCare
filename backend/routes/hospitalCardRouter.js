const express = require("express");
const { getApprovedHospitals } = require("../models/hospitalCardController");
const router = express.Router();

router.get("/approved", getApprovedHospitals);

module.exports = router;