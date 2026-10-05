const express = require('express');
const { createRole,  addPermissionToRole } = require('../controllers/roleController');

const router = express.Router();

router.post('/createRole', createRole);

router.put('/addPermission', addPermissionToRole);

module.exports = router;