const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connect', (socket) => {
    socket.on('message', (msg) => {
        io.emit('message', msg);
    });
    socket.on('add user', (username) => {
        socket.username = username;
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {username: socket.username});
    })
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});