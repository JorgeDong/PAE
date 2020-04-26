const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User');

router.get('/login', (req, res) => res.render('login'));          // Login Page
router.get('/register', (req, res) => res.render('register'));    // Register Page

router.post('/register', (req, res) => { 
    const { name, email, password, password2 } = req.body;
    let errors = [];
    if(!name || !email || !password || !password2){
        errors.push({ msg: 'Please fill all fields'});
    }
    if(password !== password2){
        errors.push({ msg: 'Passwords dont match' });
    }
    if(password.length < 6){
        errors.push({ msg: 'Passwords should be at least 6 characters long' });
    }

    if(errors.length > 0){
        res.render('register', {
            errors, name, email, password, password2
        });
    } else {
        User.findOne({ email: email })
        .then( user => {
            if(user){
                errors.push({ msg: 'Email is already registered' });
                res.render('register', {
                    errors, name, email, password, password2
                });
            } else{
                const newUser = new User({
                    id: 1,
                    name: name,
                    email: email,
                    password: password,
                    date: new Date
                });
                // Hash password
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        // Save user
                        newUser.save()
                            .then(user => {
                                res.redirect('/api/login');
                            })
                            .catch(err => console.log(err));
                }))
            }
        })
    }
});

// LOGIN
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/api/login'
    })(req, res, next);
});

// LOGOUT
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/api/login');
})

module.exports = router;