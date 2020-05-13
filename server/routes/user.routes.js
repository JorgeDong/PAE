const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { ensureAuthenticated } = require('../config/auth');
const User = require('../models/User');

router.post('/registration', (req, res) => {
    const { name, email, password, password2, direccion, city, country } = req.query;
    let errors = [];
    if(!name || !email || !password || !password2){
        errors.push({ message: 'Please fill all fields'});
    }
    if(password !== password2){
        errors.push({ message: 'Passwords dont match' });
    }
    if(password.length < 6){
        errors.push({ message: 'Passwords should be at least 6 characters long' });
    }

    if(errors.length > 0){
        res.status(400).send(errors);
    } else {
        User.findOne({ email: email })
        .then( user => {
            if(user){
                errors.push({ message: 'Email is already registered' });
                res.status(408).send(errors);
            } else{
                User.count()
                .then( cnt => {
                    const newUser = new User({
                        id: cnt+1,
                        name: name,
                        email: email,
                        password: password,
                        direccion: direccion,
                        city: city,
                        country: country,
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
                })
                .catch(err => console.log(err));
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

router.get('/profile', ensureAuthenticated, (req, res) => {
    res.status(200).send(res.locals)
});

router.get('/', (req, res) => {
    User.find()
        .then( data => {
            res.status(200).send(data);
        })
        .catch(err => console.log(err));
})

router.get('/readById/:id', (req, res) => {
    User.find({ id: req.params.id })
        .then( data => {
            res.status(200).send(data);
        })
        .catch(err => console.log(err));
})

router.get('/readByEmail/:email', (req, res) => {
    User.find({ email: req.params.email })
        .then( data => {
            res.status(200).send(data);
        })
        .catch(err => console.log(err));
})

router.put('/updateById/:id', ensureAuthenticated, (req, res) => {
    const { name, password } = req.query;
    if(req.params.id == res.locals.id){
        bcrypt.genSalt(10, (err, salt) => 
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) throw err;
                User.findOneAndUpdate({ id:req.params.id }, { $set:{ name:name, password:hash }}, (err, done)=> {
                    if(err) res.status(400).send(err);
                    res.status(200).send(done);
                })
        }))
    }
    else {
        res.status(401).send('You cannot edit a different user')
    }
});

router.put('/updateByEmail/:email', ensureAuthenticated, (req, res) => {
    const { name, password } = req.query;
    if(req.params.email == res.locals.email){
        bcrypt.genSalt(10, (err, salt) => 
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) throw err;
                User.findOneAndUpdate({ email:req.params.email }, { $set:{ name:name, password:hash }}, (err, done)=> {
                    if(err) res.status(400).send(err);
                    res.status(200).send(done);
                })
        }))
    }
    else {
        res.status(401).send('You cannot edit a different user')
    }
});

module.exports = router;