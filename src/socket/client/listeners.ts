import { authEvent, requestAuthEvent, joinEvent, messageEvent } from '../event';
import { print } from '../../utility';

export const requestAuthListener = (socket: SocketIOClient.Socket, key: string) => {

    socket.on(requestAuthEvent, () => {

        socket.emit(authEvent, {
            key: key
        });

    });

};

export const joinListener = (socket: SocketIOClient.Socket) => {

    socket.on(joinEvent, () => {

        print(`Joined network`);

    });

};

export const messageListener = (socket: SocketIOClient.Socket) => {

    socket.on(messageEvent, (arg: any) => {

        print(arg);

    });

};
