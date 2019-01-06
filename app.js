let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let app = express();
// TO DO - ADD SOCKET.IO
// TO DO - ADD JWT

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// TO DO - CONNECT TO DB

// TO DO - BUILD THE ROUTES
app.get("/", function (req, res) {
    res.render("home");
});

app.post("/api/user/:username/login", function (req, res) {

    res.render("chatroom");
});

app.listen(1337, function () {
    console.log("I can hear you on 1337");
});