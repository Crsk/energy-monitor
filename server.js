const express = require('express');
const app = expresS();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

app.get('/', function (req, res) {
    let watts = req.params.watts;
    let rms = req.params.rms;
    console.log(`watts: ${watts}`);
    console.log(`rms: ${rms}`);
});

server.listen(3001, () => {
    console.log('Server initialized on port 3001');
});