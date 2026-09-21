const { signUp, login } = require('../controllers/authController');
const { signUpValidation, loginValidation } = require('../middleware/authValidation');

const router = require('express').Router();


router.post('/signup',signUpValidation, signUp);
router.post('/login',loginValidation, login);

module.exports = router;