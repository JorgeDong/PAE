const express = require('express');
const router = express.Router();

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
        res.send('Registration OK');
    }
});

module.exports = router;