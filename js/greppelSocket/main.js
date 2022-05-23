const express = require('express');
const app = express();
const http = require('http');
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "../../../socketIOtest.html"));
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

io.on('connection', (socket) => {
    socket.on('greppelstate', (state) => {
        io.emit('greppelstate', state);
        console.log(state);
    });

    socket.on('image')
});


// https://socket.io/get-started/chat