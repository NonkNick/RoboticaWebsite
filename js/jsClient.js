window.onload=function() {
    // global.Buffer = global.Buffer || require("buffer").Buffer; // eslint-disable-line
    // const privateKey = buffer.Buffer.from(PRIVATE_KEY_1, "hex");
    console.log("nog geen error")
    // var socket = io();
    // var socket = io.connect(
    //     'http://greppel.tech/telemetrics/'
    //     , {resource: 'telemetrics/socket.io'}
    // );
    var socket = io.connect("ws://greppel.tech:3000");

    var dc1 = document.getElementById('dc1');
    var dc2 = document.getElementById('dc2');
    var dc3 = document.getElementById('dc3');
    var dc4 = document.getElementById('dc4');
    const image = document.getElementById('image');


    socket.on('greppelstate', function (msg) {

        message.innerHTML = msg;
        // console.log(JSON.parse(msg));
        var dataArr = JSON.parse(msg);
        // console.log(arr["dc1"][0]);
        dc1.style.height = dataArr["dc1"][0] + "px";
        dc2.style.height = dataArr["dc2"][0] + "px";
        dc3.style.height = dataArr["dc3"][0] + "px";
        dc4.style.height = dataArr["dc4"][0] + "px";
    });

    socket.on('image', function(data) {
        image.src = "data:image/jpeg;base64," + data;
    });
}