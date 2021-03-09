import io from 'socket.io';
const socketIO = require('socket.io')();

const newSocket = (socket: io.Socket) => {

    socket.on('iris-message', (...args) => {
        console.log(args);
    });

    socket.emit('iris-message', 'Hello World!');

};

socketIO.on('connection', (socket: io.Socket) => {

    newSocket(socket);

});

export const startServer = (port: number) => {

    socketIO.attach(port, {
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false
    });

    console.log(`Socket server running on port ${port}`);

};

export const endServer = () => {

    socketIO.close();

    console.log(`Socket server ended`);

};
