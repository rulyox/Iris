import io from 'socket.io';
const socketIO = require('socket.io')();
import state from '../state';
import { print } from '../utility';

const newSocket = (socket: io.Socket) => {

    socket.on('iris-message', (...args) => {
        print(args);
    });

    socket.emit('iris-message', 'Hello World!');

};

socketIO.on('connection', (socket: io.Socket) => {

    newSocket(socket);

});

export const startServer = () => {

    const port = state.socketPort;

    socketIO.attach(port, {
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false
    });

    print(`Socket server running on port ${port}`);

};

export const endServer = () => {

    socketIO.close();

    print(`Socket server ended`);

};
