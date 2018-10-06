const express = require('express');
const app = express();
const server = require('http').Server(app);
//const io = require('socket.io').listen(server);

app.use(express.json());

app.use('/', require('./routes/data.routes'));

server.listen(3001, () => {
    console.log('Server initialized on port 3001');
});