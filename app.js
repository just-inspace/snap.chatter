const express = require("express");
const router = require("./middle");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcryptjs");
const User = require("./app/models/users");

// TO DO - CONNECT TO DB
mongoose.connect(encodeURI(process.env.DBString), { 'useNewUrlParser': true });

// TO DO - ADD SOCKET.IO

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use('/api', router);

// TO DO - ADD JWT
// TO DO - ADD MIDDLEWARE FOR VALIDATING NEW USER
// check username exists
// check email exists
// hash the password
// store new user
app.post("/api/registration/new.json", function (req, res) {
    if (req.headers["content-type"] !== 'application/json') {
        res.render("home");
    }
    const data = req.body;
    const hashedPassword = bcrypt.hashSync(data.password, 8);

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    }, function (err, user) {
        if (err) return res.status(500).send("There was a problem registering...oops");

        res.json({ username: user.username, email: user.email, token: req.token });
    });
});
app.post("/api/registration/new", function (req, res) {
    res.render("chatroom", { username: req.body.username, email: req.body.email });
});

// TO DO - REMOVE THE FOLLOWING BLOCK 
router.get('/api/login.json', function (req, res) {

    User.findById(decoded.id).exec(function (err, user) {
        if (err) return res.status(500).send({ message: "Failed to find user" });

        res.json({ username: user.username, email: user.email, token: req.token });
    });

});

router.get('/api/login', function (req, res) {

    User.findById(decoded.id).exec(function (err, user) {
        if (err) return res.status(500).send({ message: "Failed to find user" });

        res.render("chatroom", { username: user.username, email: user.email });
    });

});
// TO DO - BUILD THE ROUTES

app.get("/", function (req, res) {
    res.render("home");
});

/*
app.post("/api/user/:username/login", function (req, res) {

    res.render("chatroom");
});
*/
app.listen(1337, function () {
    console.log("I can hear you on 1337");
});