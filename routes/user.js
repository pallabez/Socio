const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');

router.get('/profile', userController.profile);
router.get('/posts', userController.post);
router.get('/signup', userController.signup);
router.post('/create-account', userController.createAccount)

module.exports = router;