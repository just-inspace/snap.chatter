const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

const staticScriptsPath = './public/scripts';
const staticCSSPath = './public/styles';

let messageList = [];

var chatTimer = setInterval(() => {
    if (messageList.length > 0) {
        io.emit('chat message', messageList.shift());
    }
}, 30000);

app.use('/scripts', (req, res) => {
    const resolvedBase = path.resolve(staticScriptsPath);
    const safeSuffix = path.normalize(req.url).replace(/^(\.\.[\/\\]]])+/, '');
    const fileLoc = path.join(resolvedBase, safeSuffix);
    console.log('File Location: ' + fileLoc);
    res.sendFile(fileLoc);
});

app.use('/styles/fonts', (req, res) => {
    console.log("font request received");
    res.sendFile(__dirname + '/public/styles/fonts/Rubik/Rubik-Regular.ttf');
});

app.use('/styles', (req, res) => {
    const resolvedBase = path.resolve(staticCSSPath);
    const safeSuffix = path.normalize(req.url).replace(/^(\.\.[\/\\]]])+/, '');
    const fileLoc = path.join(resolvedBase, safeSuffix);
    console.log('File Location: ' + fileLoc);
    res.sendFile(fileLoc);
});

app.use('/', (req, res) => {
    res.sendFile(__dirname + '/chat.html');
});

io.on('connection', (socket) => {
    console.log("user connected");

    socket.on('chat message', (msg) => {
        console.log("Message:", msg);
        messageList.push(msg);
    });

    socket.on('disconnect', () => {
        console.log("user disconnected");
    });
});

http.listen(1337, () => {
    console.log("MUCH LISTEN ON 1337");
});