import fs from 'fs';
import path from 'path';
import { SocketStream } from 'stream-socket.io';
import { authEvent, requestAuthEvent, infoEvent, requestInfoEvent, joinEvent, commandEvent, messageEvent, fileEvent } from '../event';
import state from '../../state';
import execute from '../../execute';
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
            id: state.id,
            name: state.name,
            ip: state.ip,
            apiPort: state.apiPort,
            socketPort: state.socketPort
        });

    });

};

export const joinListener = (socket: SocketIOClient.Socket) => {

    socket.on(joinEvent, (arg: any) => {

        const networkConfig: any = arg.networkConfig;
        const networkMap: any = arg.networkMap;
        const id: string = arg.id;

        print('network', `Joined network ${networkConfig.name}`);

        state.networkConfig = networkConfig;
        state.networkMap = networkMap;
        state.addSocketServer(id, socket);

    });

};

export const commandListener = (socket: SocketIOClient.Socket) => {

    socket.on(commandEvent, (arg: any) => {

        const command = arg.command;

        print(undefined, `Command : ${command}`);

        execute.execute(command)
            .then((result) => print(undefined, result))
            .catch((error) => print('error', error));

    });

};

export const fileListener = (socket: SocketIOClient.Socket) => {

    socketStream.on(socket, fileEvent, (readStream, id, options) => {

        const target = path.join(getDirectory(options.directory)!, options.name);
        const fileStream = fs.createWriteStream(target);
        readStream.pipe(fileStream);

    });

};

export const messageListener = (socket: SocketIOClient.Socket) => {

    socket.on(messageEvent, (arg: any) => {

        print(undefined, `Message : ${arg}`);

    });

};
