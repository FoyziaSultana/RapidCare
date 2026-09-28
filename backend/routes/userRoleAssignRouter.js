
const express = require('express');

const { rolesAssignToUser } = require('../controllers/userRoleAssignController');

const router = express.Router();

router.put('/assignRoles', rolesAssignToUser);

module.exports = router;