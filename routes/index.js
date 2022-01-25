const express = require('express');
const router = express.Router();
const passport = require('passport');

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/user', require('./user'));
router.use('/post', require('./post'));


module.exports = router;