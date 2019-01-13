const express = require('express');
const router = express.Router();

/** Chat Page */
router.get('/:username', (req, res) => {
    res.sendFile(__dirname + '/chat.html');
});

/** Login Redirection */
router.post('/', (req, res) => {

    // Parse the request body for username
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    })
        .on('end', () => {
            // After parsing, redirect the client
            body = body.split('=').pop();
            return res.redirect('/' + body);
        });
});

/** Home Page */
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

module.exports = router;