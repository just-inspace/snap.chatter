$(() => {
    let socket = io();
    $("#message-form").submit((e) => {
        e.preventDefault();
        let message = {
            username: "justin",
            content: $('#message-box').val()
        };

        if (message.content.length > 0) {
            socket.emit('chat message', message);
        }

        $('#message-box').val('');
        return false;
    });
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
            $('#message-list li').removeClass('new-message')
        }, 3000);
    });
    socket.on('delete', () => {
        console.log('delete received...');

        $('#message-list').empty();
    });
});

// let count = 1;
// const max = 3;

// $(document).ready(() => {
//     $('.controller').on('click', function () {
//         if (count > max) {
//             count = 1;
//             $('li').toggleClass('animate');
//         } else {
//             $("ul li:nth-child(" + count + ")").toggleClass('animate');
//             count++;
//         }
//         console.log(count);
//     });
//     $('li').bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function (e) {
//         $(this).remove();
//     });
// });
