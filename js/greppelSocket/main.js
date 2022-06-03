const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const path = require("path");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
const buffer = require("buffer");

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://greppel.tech",
        methods: ["GET", "POST"]
    },
    serveClient: true
});

app.get('/', (req, res) => {
    app.use(express.static(__dirname + '../../../'));
    res.sendFile(path.join(__dirname + "../../../telemetrics.html"));
});

httpServer.listen(3000, () => {
    console.log('listening on *:3000');
});

io.on('connection', (socket) => {
    socket.on('greppelstate', (state) => {
        io.emit('greppelstate', state);
        // console.log(state);
    });

    socket.on('image', (img) => {
        io.emit('image', Buffer.from(img, 'base64').toString());
    });
});

io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});

io.sockets.on('disconnect', function() {
// handle disconnect
    io.sockets.disconnect();
    io.sockets.close();
});


// https://socket.io/get-started/chat