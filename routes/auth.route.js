const express = require('express');
// const { signup, login } = require('../controller/auth.controller');
const router = express.Router();
const authController = require('../controller/auth.controller');
const authMiddleware=require('../middleware/authMiddleware')
// router.use(authMiddleware);
router.post('/signup' ,authController.signup);
router.post('/login',authMiddleware, authController.login);

module.exports = router;