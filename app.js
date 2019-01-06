const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("./config");
const User = require("./app/models/users");

// TO DO - CONNECT TO DB
mongoose.connect(encodeURI(process.env.DBString), { 'useNewUrlParser': true });

// TO DO - ADD SOCKET.IO

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use('/', router);

// TO DO - ADD JWT
// TO DO - ADD MIDDLEWARE FOR VALIDATING NEW USER
router.post("/api/registration/new", function (req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    }, function (err, user) {
        if (err) return res.status(500).send("There was a problem registering...oops");

        // create a token
        let token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400
        });

        res.status(200).send({ auth: true, token: token });
    });
});

// TO DO - REMOVE THE FOLLOWING BLOCK 
router.get('/me', function (req, res) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        User.findById(decoded.id).exec(function (err, user) {
            if (err) return res.status(500).send({ message: "Failed to find user" });

            res.status(200).send({ username: user.username, email: user.email });
        });
    });
});

// TO DO - BUILD THE ROUTES
/*
app.get("/", function (req, res) {
    res.render("home");
});

app.post("/api/user/:username/login", function (req, res) {

    res.render("chatroom");
});
*/
app.listen(1337, function () {
    console.log("I can hear you on 1337");
});