$(() => {

    /** Get username from URL */
    let username;
    let parser = document.createElement('a');
    parser.href = window.location.href;
    username = parser.pathname.split('/').pop();

    /**
     * Socket.IO Functions
     *  * Emit message object to socket
     *      ** { username, content, timeout }
     *  * Recieve message from socket
     *  * Recieve delete request from socket
     *  * Render and animate messages
     */
    let socket = io();

    /** Emit message to socket */
    $("#message-form").submit((e) => {
        e.preventDefault();
        let timeout = parseInt($('#timeout').val());

        let message = {
            username: username,
            content: $('#message-box').val(),
            timeout: timeout
        };

        // Validate a message exists and timeout is a number
        if (message.content.length > 0 && !isNaN(timeout)) {
            socket.emit('chat message', message);
        }

        $('#timeout').val('');
        $('#message-box').val('');
        return false;
    });

    /** Recieve message from socket 
     *  Delete old message
     *  Render and animate new message
    */
    socket.on('chat message', (msg) => {
        $('#message-list').empty();
        $('#message-list').append('<li alt="new message" class="message new-message anim-new-message">' +
            '<h1 alt="sender" class="username">' +
            msg.username +
            '</h1>' +
            '<span alt="message content" class="message-content">' +
            msg.content +
            '</span>' +
            '</li>');

        setTimeout(() => {
            $('#message-list li').removeClass('new-message');
            $('#message-list li').removeClass('anim-new-message');
        }, 2000);
        setTimeout(() => {
            $('#message-list li').addClass('anim-old-message');
        }, (msg.timeout * 1000) - 2000);
    });

    /** Recieve delete request from socket */
    socket.on('delete', () => {
        $('#message-list').empty();
    });
});