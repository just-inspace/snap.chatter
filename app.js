const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static("scripts"));
app.use(express.static("styles"));

app.use('/', (req, res) => {
    res.sendFile(__dirname + '/chat.html');
});

io.on('connection', (socket) => {
    console.log("user connected");

    socket.on('chat message', (msg) => {
        console.log("Message:", msg);
        socket.broadcast.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log("user disconnected");
    });
});

http.listen(1337, () => {
    console.log("MUCH LISTEN ON 1337");
});