const express = require('express');
const { createPermission } = require('../controllers/permissionController');

const router = express.Router();


router.post('/createPermission', createPermission);

module.exports = router;