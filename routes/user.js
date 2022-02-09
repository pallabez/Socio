const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');

router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.post('/update/:id', passport.checkAuthentication, userController.update);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.get('/sign-out', userController.destroySession);
router.post('/create', userController.create);

router.post('/create-session', passport.authenticate(
  'local', 
  {failureRedirect: '/user/sign-in'},
), userController.createSession);    //use passport as a middleware to authenticate

module.exports = router;