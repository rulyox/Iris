import socketClient from 'socket.io-client';
import { messageListener, requestAuthListener } from './listeners';
import { print } from '../../utility';

let socket: SocketIOClient.Socket|undefined;

export const startClient = (ip: string, port: number, key: string) => {

    socket = socketClient(`ws://${ip}:${port}`);

    // listeners
    messageListener(socket);
    requestAuthListener(socket, key);

    print(`Socket client connected`);

};

export const endClient = () => {

    if(socket !== undefined) {

        socket.close();
        socket = undefined;

        print(`Socket client ended`);

    }

};
