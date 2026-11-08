const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddlewareForaccess");
const { addBlood, getAllBlood } = require("../controllers/bloodController");

router.post("/add", authMiddleware, permissionMiddleware("add_blood"), addBlood);
router.get("/view", authMiddleware, permissionMiddleware("view_blood"), getAllBlood);
module.exports = router;