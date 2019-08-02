const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    let newUser = new User({
        name: name,
        email: email,
        username: username,
        password: password
    });

    // let newUser = new newUser();
    //     newUser.name = req.body.name;
    //     newUser.email = req.body.email;
    //     newUser.username = req.body.username;
    //     newUser.password = req.body.password;

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) {
                    console.log('encryption error: ' + err);
                }
                newUser.password = hash;
                newUser.save( (error) => {
                    if(error) {
                        console.log(error);
                        return;
                    } else {
                        req.flash('success','successfully created the account');
                        res.redirect('/articles');
                    }
                });
            });
        });
});

//Login
router.get('/login', (req, res) => {
    res.render('login');
});

//Login process
router.post('/login', (req, res) => {
    passport.authenticate('local', {
        failureRedirect: '/users/login',
    }),
    (req, res) => {
        res.redirect('/');
    }
});


module.exports = router; 