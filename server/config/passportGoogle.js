const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const googleConfig = require('./googleConfig');
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.use(new GoogleStrategy({
    clientID: googleConfig.clientID,
    clientSecret: googleConfig.clientSecret,
    callbackURL: googleConfig.callbackURL // localhost:3000/google/redirect    
}, function(accessToken, refreshToken, profile, done){
    if(profile==null){
        done(null, false, {error: "Autentificación por Google Fallo"})
        return;
    }
    
    User.findOne({ email: profile._json.email })
        .then( user => {
            if(user){
                done(null, user);
                console.log("Google User found!");
                return;
            } else{
                User.count()
                .then( cnt => {
                    const newUser = new User({
                        id: cnt+1,
                        name: profile._json.name,
                        email: profile._json.email,
                        password: '12345',
                        direccion: profile._json.direccion,
                        city: 'No City Specified',
                        country: 'No Country Specified',
                        date: profile._json.date,
                        token: ''
                    });
                    // Hash password
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash;
                            console.log("El usuario es: "+ newUser);
                            done(null, newUser);
                            // Save user
                            /*newUser.save()
                                .then(user => {
                                    done(null, user);
                                })
                                .catch(err => console.log(err));*/
                    }))
                })
                .catch(err => console.log(err));
            }
        })
}

))

function googleLogin(req, res){
    console.log("Starting googleLogin...");
    passport.authenticate('google', (err, user, info) => {
        console.log("Starting Google Strategy");
        console.log(user);
    })(req, res)
}

module.exports = {googleLogin};