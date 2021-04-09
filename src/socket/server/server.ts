import { Socket, Server } from 'socket.io';
import { requestAuthEvent } from '../event';
import { authListener, infoListener, commandListener, fileListener, messageListener, disconnectListener } from './listeners';
import state from '../../state';
import { print } from '../../utility';

let socketServer: Server|undefined;

const registerSocket = (socket: Socket) => {

    print(`Socket ${socket.id} registered`);

    // request network key
    socket.emit(requestAuthEvent);

    // listeners
    authListener(socket);
    infoListener(socket);
    commandListener(socket);
    fileListener(socket);
    messageListener(socket);
    disconnectListener(socket);

};

export const startServer = () => {

    socketServer = new Server();

    const port = state.socketPort;

    socketServer.on('connection', (socket: Socket) => {

        registerSocket(socket);

    });

    socketServer.attach(port, {
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false
    });

    print(`Socket server running on port ${port}`);

};

export const endServer = () => {

    if(socketServer !== undefined) {

        socketServer.close();
        socketServer = undefined;

        print(`Socket server ended`);

    }

};
