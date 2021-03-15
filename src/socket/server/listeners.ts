import { Socket } from 'socket.io';
import { authEvent, infoEvent, requestInfoEvent, messageEvent, joinEvent } from '../event';
import state from '../../state';
import { print } from '../../utility';

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

export const authListener = (socket: Socket) => {

    socket.on(authEvent, (arg) => {

        const result = parseAuth(arg);

        if(result.result) {

            socket.emit(requestInfoEvent);

        } else {

            socket.emit(messageEvent, result.message);
            socket.disconnect();

        }

    });

};

export const infoListener = (socket: Socket) => {

    socket.on(infoEvent, (arg) => {

        print(`Socket ${socket.id} joined network`);

        socket.emit(joinEvent);
        state.addSocketClient(socket.id, socket);

    });

};

export const disconnectListener = (socket: Socket) => {

    socket.on('disconnect', (reason) => {

        print(`Socket ${socket.id} disconnected : ${reason}`);

        state.removeSocketClient(socket.id);

    });

};
