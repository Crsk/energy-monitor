const socket = io();

let btn = document.getElementById('btn');
let msg = document.getElementById('msg');

btn.addEventListener('click', () => {
    socket.emit('msg', {
        message: 'socket test'
    });
});

socket.on('msg', () => {
    msg.innerHTML += ' test';
});