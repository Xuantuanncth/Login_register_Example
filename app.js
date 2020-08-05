const express = require("express");
const expressLayout = require("express-ejs-layouts");
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();
//Require passport
require('./config/passport')(passport);

//DB config
const db = require('./config/keys').MongoURL;

//Connect to mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => { console.log("Mongodb connected") })
    .catch((err) => { console.log(err) })

//ejs
app.use(expressLayout);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({ extended: false }));

//Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Global Vars

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Router
app.use('/', require("./routes/index"));
app.use('/users', require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server listen port: ", PORT));