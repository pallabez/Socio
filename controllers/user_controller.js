const db = require('../config/mongoose');
const User = require('../models/user');

module.exports.profile = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user,
        });
    });
}

module.exports.signUp = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }

    return res.render('user_sign_up', {
        title: "Sign Up!",
    });
}

module.exports.signIn = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }

    return res.render('user_sign_in', {
        title: "Sign in!",
    });
}

module.exports.create = function(req, res) {
    if(req.body.password != req.body.confirm_password) {
        console.log("Password didn't match.")
        return res.redirect('back');
    }
    User.findOne({username: req.body.username}, function(err, user) {
        if(err) {
            console.log(`Error in finding user in sign up ${err}`);
            return;
        }

        if(!user) {
            User.create(req.body, function(err, user) {
                if(err) {
                    console.log(`Error in creating the user. Error : ${err}`);
                    return;
                }
                return res.redirect('/user/sign-in');
            });
        } else {
            return res.redirect('back');
        }
    });
}


module.exports.createSession = function(req, res) {
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
    req.logout();           //by passport
    return res.redirect('/');
}