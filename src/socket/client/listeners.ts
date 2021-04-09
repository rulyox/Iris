import fs from 'fs';
import path from 'path';
import { SocketStream } from 'stream-socket.io';
import { authEvent, requestAuthEvent, infoEvent, requestInfoEvent, joinEvent, commandEvent, messageEvent, fileEvent } from '../event';
import { parseJoinResponse } from './parsers';
import commands from '../commands';
import state from '../../state';
import { print, getDirectory } from '../../utility';

const socketStream = new SocketStream();

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
            name: state.name,
            ip: state.ip,
            apiPort: state.apiPort,
            socketPort: state.socketPort
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

            // debug
            console.log(state.networkConfig);

        } else {

            socket.emit(messageEvent, result.message);
            socket.disconnect();

        }

    });

};

export const commandListener = (socket: SocketIOClient.Socket) => {

    socket.on(commandEvent, (arg: any) => {

        commands.test(arg);

    });

};

export const fileListener = (socket: SocketIOClient.Socket) => {

    socketStream.on(socket, fileEvent, (readStream, id, options) => {

        const target = path.join(getDirectory('public')!, options.name);
        const fileStream = fs.createWriteStream(target);
        readStream.pipe(fileStream);

    });

};

export const messageListener = (socket: SocketIOClient.Socket) => {

    socket.on(messageEvent, (arg: any) => {

        print(`Message : ${arg}`);

    });

};
