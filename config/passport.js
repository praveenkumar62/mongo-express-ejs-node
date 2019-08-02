const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

const passport = (passport) => {
    //Local Strategy
    passport.use(new LocalStrategy(function(username, password, done) {
            User.findOne({username: username}, (err, user)=> {
                if(err) {
                    return done(err);
                }
                if(!user) {
                    return done(null, false, {message: 'Incorrect Username'});
                }
                
                //match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;
                    if(ismatch) {
                        return done(null, user); 
                    } else {
                        return done(null, false, {message: 'Incorrect Password'});
                    }
                })
            })
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, users) => {
            done(err, users);
        })
    });
}

module.exports = passport;