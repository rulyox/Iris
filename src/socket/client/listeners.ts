import { authEvent, requestAuthEvent, infoEvent, requestInfoEvent, joinEvent, messageEvent } from '../event';
import state from '../../state';
import { print } from '../../utility';

export const requestAuthListener = (socket: SocketIOClient.Socket, key: string) => {

    socket.on(requestAuthEvent, () => {

        socket.emit(authEvent, {
            key: key
        });

    });

};

export const requestInfoListener = (socket: SocketIOClient.Socket) => {

    socket.on(requestInfoEvent, () => {

        socket.emit(infoEvent, {
            test: 'info'
        });

    });

};

export const joinListener = (socket: SocketIOClient.Socket) => {

    socket.on(joinEvent, () => {

        print('Joined network');

        state.addSocketServer(socket.id, socket);

    });

};

export const messageListener = (socket: SocketIOClient.Socket) => {

    socket.on(messageEvent, (arg: any) => {

        print(arg);

    });

};
