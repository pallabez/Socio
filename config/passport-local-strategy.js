const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'username',
    },
    function(username, password, done) {
        //find a user and establish the identity
        User.findOne({username: username}, function(err, user) {
            if(err) {
                console.log("Error in finding user --> Passport");
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password != password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

//serializing the user to decide which key is to kept in the cookies
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if(err) {
            console.log("Error in finding user --> Passport");
            return done(err);
        }
        return done(null, user);
    });
});

passport.checkAuthentication = function(req, res, next) {
    //if the user is signed in then pass to the next function
    if(req.isAuthenticated()) {
        return next();
    }
    //if the user is not signed in 
    return res.redirect('/user/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next) {
    if(req.isAuthenticated()) {
        res.locals.user = req.user;     //req.user made by passport is sent to res.locals
    }
    next();
}

module.exports = passport;