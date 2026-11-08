const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddlewareForaccess");
const { addBlood } = require("../controllers/bloodController");

router.post("/add", authMiddleware, permissionMiddleware("add_blood"), addBlood);

module.exports = router;