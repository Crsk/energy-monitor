const express = require('express');
const morgan = require('morgan');
const { mongoose } = require('./models/dbContext');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);
const data = require('./models/data');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/api/data', require('./routes/data.routes'));
app.use(express.static(path.join(__dirname, 'public', 'dist', 'energy-monitor')));

app.post('/api/data', async (req, res) => {
    const _data = new data(req.body);
    await _data.save();
    io.emit('data', _data);
    io.emit('data:value', _data.value);
    io.emit('data:date', _data.date);
    res.json({
        'status': 'inserted'
    });
});

io.on('connection', (socket) => {
    console.log(`new connection id ${socket.id}`);

    socket.on('msg', data => {
        io.sockets.emit('msg', data);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => console.log(`Server running on port ${port}`));