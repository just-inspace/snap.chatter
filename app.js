/**
 * Server File
 *
 * Responsibilities:
 *  * Control all routing
 *  * Control socket.io funcions
 *    * Message Send/Recieve/Delete
 *    * Associated timers
 *  * Maintain array of messages as queue-like structure
 */
const router = require("./routes");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

// Array of current messages
let messageList = [];

// Flag to send delete request when list is empty
let deleteLast = false;

/**
 * Message Send Timer
 *   * Dequeue messages and set expiration timer
 *   * Ensure timer is between 8 and 30 seconds
 *   * Send oldest message
 *   * Send delete request when list is empty
 */
setTimeout(function message() {
	let interval = 1;
	if (messageList.length > 0) {
		interval = messageList[0].timeout;
		if (interval) {
			if (interval < 8) interval = 8;

			if (interval > 30) interval = 30;
		} else {
			interval = 8;
		}
		messageList[0].timeout = interval;

		// Dequeue and emit the oldest message
		io.emit("chat message", messageList.shift());
		deleteLast = true;
	} else if (deleteLast) {
		interval = 1;
		io.emit("delete");
		deleteLast = false;
	}

	messageTimeout = setTimeout(message, 1000 * interval);
}, 1000);

/**
 * Socket.IO Functions
 *  * 'connection'
 *  * 'chat message'
 *  * 'message limit'
 *  * 'disconnect'
 */
io.on("connection", socket => {
	console.log("user connected");

	socket.on("chat message", msg => {
		if (messageList.length < 10) messageList.push(msg);
		else {
			socket.emit("message limit");
		}
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

/**
 * HTTP Server Start
 */
app.use(express.static("public"));
app.use("/", router);

http.listen(1337, () => {
	console.log("MUCH LISTEN ON 1337");
});
