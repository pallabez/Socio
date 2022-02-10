const db = require('../config/mongoose');
const User = require('../models/user');

module.exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        return res.render('user_profile', {
            title: 'User Profile',
            profileUser: user,
        });
    } catch(err) {
        console.log('Error in loading profile page');
        return;
    }
}

module.exports.update = async (req, res) => {
    try {
        if(req.user.id == req.params.id) {
            await User.findByIdAndUpdate(req.params.id, req.body)
            return res.redirect('back'); 
        } else {
            return res.status(401).send('Unauthorized');
        }
    } catch(err) {
        console.log('Error in updating profile');
        return;
    }
}

module.exports.signUp = function(req, res) {
    try {
        if(req.isAuthenticated()) {
            return res.redirect('/user/profile');
        }
        return res.render('user_sign_up', {
            title: "Sign Up!",
        });
    } catch(err) {
        console.log("Error displaying signup page", err);
        return;
    }
}

module.exports.signIn = function(req, res) {
    try {
        if(req.isAuthenticated()) {
            return res.redirect('/user/profile');
        }
        return res.render('user_sign_in', {
            title: "Sign in!",
        });
    } catch(err) {
        console.log('Error displaying signin page', err);
        return;
    }
}

module.exports.create = async (req, res) => {
    try {
        if(req.body.password != req.body.confirm_password) {
            console.log("Password didn't match.")
            return res.redirect('back');
        }
        const user = await User.findOne({username: req.body.username});
        if(!user) {
            await User.create(req.body)
            return res.redirect('/user/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch(err) {
        console.log('Error in signing in user', err);
        return;
    }     
}


module.exports.createSession = function(req, res) {
    try {
        return res.redirect('/');
    } catch(err) {
        console.log('Error in creating session', err);
        return;
    }
}

module.exports.destroySession = function(req, res) {
    try {
        req.logout();           //by passport
        return res.redirect('/');
    } catch(err) {
        console.log('Error in destroying session', err);
        return;
    }
}