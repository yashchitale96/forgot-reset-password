const express = require('express');
const router = express.Router();
const {Signup, Login, forgetPassword, resetPassword} = require('../controller/user.controller.js')

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/forgetpassword', forgetPassword);
router.post('/reset-password/:token', resetPassword);


module.exports = router;