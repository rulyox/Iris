import io from 'socket.io';
const socketIO = require('socket.io')();
import state from '../state';
import { print } from '../utility';

const registerSocket = (socket: io.Socket) => {

    print(`Socket ${socket.id} registered`);

    socket.on('iris-auth', (arg) => {

        const result = parseAuth(arg);

        if(result.result) {

            print(`Socket ${socket.id} joined network`);

            state.addSocketClient(socket.id, socket);

        } else {

            socket.emit('iris-message', result.message);
            socket.disconnect();

        }

    });

    socket.on('disconnect', (reason) => {

        print(`Socket ${socket.id} disconnected : ${reason}`);

        state.removeSocketClient(socket.id);

    });

};

const parseAuth = (arg: any): {
    result: boolean,
    message: string|null
} => {

    if(typeof arg === 'object' && !(arg instanceof Array)) {

        if(arg?.key) {

            if(state.networkConfig.key === arg.key) {

                return { result: true, message: null };

            } else {

                return { result: false, message: 'Wrong key' };

            }

        } else {

            return { result: false, message: 'Do not have key' };

        }

    } else {

        return { result: false, message: 'Not an object' };

    }

};

export const startServer = () => {

    const port = state.socketPort;

    socketIO.on('connection', (socket: io.Socket) => {

        registerSocket(socket);

    });

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
