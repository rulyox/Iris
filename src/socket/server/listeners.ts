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

                return { result: false, message: 'Auth Error : Wrong key' };

            }

        } else {

            return { result: false, message: 'Auth Error : Do not have key' };

        }

    } else {

        return { result: false, message: 'Auth Error : Not an object' };

    }

};

const parseInfo = (arg: any): {
    result: boolean,
    message: string|null,
    name: string|null
} => {

    if(typeof arg === 'object' && !(arg instanceof Array)) {

        if(arg?.name) {

            return { result: true, message: null, name: arg.name };

        } else {

            return { result: false, message: 'Info Error : Do not have name', name: null };

        }

    } else {

        return { result: false, message: 'Info Error : Not an object', name: null };

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

        const result = parseInfo(arg);

        if(result.result) {

            const name: string = result.name!;

            print(`Socket ${socket.id} ${name} joined network`);

            socket.emit(joinEvent);
            state.addSocketClient(socket.id, socket);

        } else {

            socket.emit(messageEvent, result.message);
            socket.disconnect();

        }

    });

};

export const disconnectListener = (socket: Socket) => {

    socket.on('disconnect', (reason) => {

        print(`Socket ${socket.id} disconnected : ${reason}`);

        state.removeSocketClient(socket.id);

    });

};
