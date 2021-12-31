const db = require('../config/mongoose');
const User = require('../models/user');

module.exports.profile = function(req, res) {
    return res.render('user_profile', {
        title: "Profile",
    });
}

module.exports.post = function(req, res) {
    return res.end("<h1>User Posts</h1>")
}

module.exports.signup = function(req, res) {
    return res.render('signup', {
        title: "Sign Up!",
    });
}

module.exports.createAccount = function(req, res) {
    User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    }, function(err, newUser) {
        if(err) {
            console.log(`Error in creating the user. Error : ${err}`);
            return;
        }
        res.redirect('/user/profile');
    });
}