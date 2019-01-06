const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const config = require("./config");
const User = require("./app/models/users");
const bcrypt = require("bcryptjs");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// TO DO - DEFINE MIDDLEWARE FUNCTIONS

// ROUTES FOR MW
// /registration/new
// no token checking
// generate new token
router.use('/registration/new.json', function (req, res, next) {
    if (req.headers['content-type'] !== 'application/json') {
        return next();
    }
    let token = jwt.sign({ username: req.body.username }, config.secret, {
        expiresIn: 86400
    });
    req.token = token;
    res.auth = true;
    next();
});
// /login
// no token checking
// check username exists
// check password matches
// generate token
router.use('/login.json', function (req, res, next) {
    if (req.headers['content-type'] !== 'application/json') {
        res.render("home");
    }

    User.find({ username: req.body.username }, (err, res) => {
        if (res.length > 0) {
            console.log("matching user found");
        }
    }).find({ password: bcrypt.hashSync(req.body.password, 8) }, (err, res) => {
        if (res.length > 0) {
            console.log("matching password found");
        }
    });

    let token = jwt.sign({ username: req.body.username }, config.secret, {
        expiresIn: 86400
    });

    req.token = token;
    res.auth = true;
    next();
});
// /users/:username/profile
// check token
// ...
router.use('/users/:username/profile', function (req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) res.render("home", { auth: false, message: 'Unexpected: No token' });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) res.render("home", { auth: false, message: 'Invalid token' });
        next();
    });
});
// /messages
// check token
// ...
// router.use('/messages', function(req,res, next) {

//     next();
// });

module.exports = router;