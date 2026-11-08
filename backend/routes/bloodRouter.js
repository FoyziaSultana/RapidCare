const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddlewareForaccess");
const { addBlood, getAllBlood, updateBlood, deleteBlood } = require("../controllers/bloodController");

router.post("/add", authMiddleware, permissionMiddleware("add_blood"), addBlood);
router.get("/view", authMiddleware, permissionMiddleware("view_blood"), getAllBlood);
router.put("/update/:bloodId", authMiddleware, permissionMiddleware("update_blood"), updateBlood);
router.delete("/delete/:bloodId", authMiddleware, permissionMiddleware("delete_blood"), deleteBlood);
module.exports = router;