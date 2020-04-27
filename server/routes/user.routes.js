const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { ensureAuthenticated } = require('../config/auth');
const User = require('../models/User');

router.post('/registration', (req, res) => {
    const { name, email, password, password2 } = req.query;
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
        res.status(400).send(errors);
    } else {
        User.findOne({ email: email })
        .then( user => {
            if(user){
                errors.push({ msg: 'Email is already registered' });
                res.status(408).send(errors);
            } else{
                const newUser = new User({
                    id: 2,
                    name: name,
                    email: email,
                    password: password,
                    date: new Date,
                    token: ''
                });
                // Hash password
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        // Save user
                        newUser.save()
                            .then(user => {
                                res.status(201).send(newUser);
                            })
                            .catch(err => console.log(err));
                }))
            }
        })
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(user){
            const body = { _id : user._id, email : user.email };
            let token = jwt.sign({ name: body }, 'PAE2020', {expiresIn:'1d'});
            User.collection.update({ email:user.email}, {$set: {"token":token}});
            res.status(200).send({token: token, email: user.email});
        } else {
            res.status(401).send({err, info});
        }
    })(req, res, next);
});

router.post('/logout', (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if(user){
            User.collection.update({ email:user.email}, {$set: {"token":''}});
            res.status(200).send({user});
        } else {
            res.status(401).send({info});
        }
    })(req, res);
})

// Ruta segura, necesita el header: Authorization: 'user-token'
router.get('/profile', ensureAuthenticated, (req, res) => 
    res.status(200).send(res.locals)
);

module.exports = router;