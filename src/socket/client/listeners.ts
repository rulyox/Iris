import { authEvent, requestAuthEvent, messageEvent } from '../event';
import { print } from '../../utility';

export const messageListener = (socket: SocketIOClient.Socket) => {

    socket.on(messageEvent, (arg: any) => {

        print(arg);

    });

};

export const requestAuthListener = (socket: SocketIOClient.Socket, key: string) => {

    socket.on(requestAuthEvent, () => {

        socket.emit(authEvent, {
            key: key
        });

    });

};
