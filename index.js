const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//Used for session cookie
const session = require('express-session');
const passport = require('passport');
const possportLocal = require('./config/passport-local-strategy');


app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);        //use it before routes

app.set('layout extractStyles', true);  //extract style and scripts from sub pages into the layout
app.set('layout extractScripts', true);
 
//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views')

//needs to be below view engine
app.use(session({
    name: 'socio',
    secret: 'blahsomething',         //Change the secret key before deployment
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100) 
    }
}));

app.use(passport.initialize());
app.use(passport.session());

//use express router
app.use('/', require('./routes/index'));      

app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running the server: ${err}`);
        return;
    }

    console.log(`Server is running on port: ${port}`);
});


