const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.post("/api/login", (req, res) => {
    res.body = { "username": req.body.username };
    res.redirect("/api/messages/" + req.body.username);
});

app.use("/api/messages/:username", (req, res) => {
    res.render("chatroom", { username: req.params.username });
});

app.get("/", function (req, res) {
    res.render("home");
});

app.listen(1337, function () {
    console.log("I can hear you on 1337");
});