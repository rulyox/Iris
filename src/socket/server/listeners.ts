import { Socket } from 'socket.io';
import { authEvent, infoEvent, requestInfoEvent, messageEvent, joinEvent } from '../event';
import { parseAuth, parseInfo } from './parsers';
import state from '../../state';
import { print } from '../../utility';

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
            const ip: string = result.ip!;
            const apiPort: number = result.apiPort!;
            const socketPort: number = result.socketPort!;

            print(`${name} joined network`);

            state.addSocketClient(socket.id, socket, name, ip, apiPort, socketPort);

            socket.emit(joinEvent, {
                networkConfig: state.networkConfig
            });

            // debug
            console.log(state.networkMap);

        } else {

            socket.emit(messageEvent, result.message);
            socket.disconnect();

        }

    });

};

export const messageListener = (socket: Socket) => {

    socket.on(messageEvent, (arg: any) => {

        print(`Message : ${arg}`);

    });

};

export const disconnectListener = (socket: Socket) => {

    socket.on('disconnect', (reason) => {

        print(`Socket ${socket.id} disconnected : ${reason}`);

        state.removeSocketClient(socket.id);

    });

};
