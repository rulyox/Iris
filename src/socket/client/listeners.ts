import { authEvent, requestAuthEvent, infoEvent, requestInfoEvent, joinEvent, messageEvent } from '../event';
import state from '../../state';
import { print } from '../../utility';

const parseJoinResponse = (arg: any): {
    result: boolean,
    message: string|null,
    networkConfig: any
} => {

    if(typeof arg === 'object' && !(arg instanceof Array)) {

        if(arg?.networkConfig) {

            return { result: true, message: null, networkConfig: arg.networkConfig };

        } else {

            return { result: false, message: 'JoinResponse Error : Do not have network config', networkConfig: null };

        }

    } else {

        return { result: false, message: 'JoinResponse Error : Not an object', networkConfig: null };

    }

};

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
            name: state.name
        });

    });

};

export const joinListener = (socket: SocketIOClient.Socket) => {

    socket.on(joinEvent, (arg: any) => {

        const result = parseJoinResponse(arg);

        if(result.result) {

            state.networkConfig = result.networkConfig;

            print(`Joined network ${state.networkConfig.name}`);

            state.addSocketServer(socket.id, socket);

        } else {

            socket.emit(messageEvent, result.message);
            socket.disconnect();

        }

    });

};

export const messageListener = (socket: SocketIOClient.Socket) => {

    socket.on(messageEvent, (arg: any) => {

        print(`Message : ${arg}`);

    });

};
