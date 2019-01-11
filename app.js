const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');

app.use(express.static('public'));
app.use(express.static('views'));

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/login", (req, res) => {
    console.log(req.body);
    res.body = { "username": req.body.username };
    res.redirect("/api/messages/" + req.body.username);
});

app.use("/api/messages/:username", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/chat.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/views/home.html"));
});

app.listen(1337, function () {
    console.log("I can hear you on 1337");
});