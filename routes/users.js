const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require('passport');

//User model
const User = require("../models/User");

router.get("/login", (req, res, err) => {
    res.render("login");
});

router.get("/register", (req, res, err) => {
    res.render("register");
});

//Register handle

router.post("/register", (req, res) => {
    const { name, email, password, password2 } = req.body;
    let error_register = [];
    //check filed
    if (!name || !email || !password || !password2) {
        error_register.push({ msg: 'Please fill in all field' });
    }

    //check match password

    if (password !== password2) {
        error_register.push({ msg: 'Password do not match' });
    }

    //check pass length
    if (password.length < 6) {
        error_register.push({ msg: 'Password should be  least 6 characters' })
    }

    if (error_register.length > 0) {
        res.render('register', {
            error_register,
            name,
            email,
            password,
            password2
        });
    } else {
        // Validation value
        User.findOne({ email: email })
            .then((user) => {
                if (user) {
                    //User exists
                    error_register.push({ msg: "Email is already register" });
                    res.render('register', {
                        error_register,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    console.log(newUser);
                    //hash password 
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        //set password to hash
                        newUser.password = hash;
                        //save to new user
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered and can login');
                                res.redirect("/users/login");
                            })
                            .catch(err => console.log(err));
                    }));
                }
            })
    }
});

//login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//logout handle

router.get('/logout', (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;