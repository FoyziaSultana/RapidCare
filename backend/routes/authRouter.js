const { signUp, login, hospitalRegister } = require('../controllers/authController');
const { signUpValidation, loginValidation, hospitalRegisterValidation } = require('../middleware/authValidation');

const router = require('express').Router();


router.post('/signup',signUpValidation, signUp);
router.post('/login',loginValidation, login);
router.post('/hospitalRegister', hospitalRegisterValidation, hospitalRegister )

module.exports = router;