import fs from 'fs';
import path from 'path';
import { Socket } from 'socket.io';
import { SocketStream } from 'stream-socket.io';
import { messageEvent, commandEvent, fileSaveEvent } from '../event';
import execute from '../../execute';
import { print, getDirectory } from '../../utility';

const socketStream = new SocketStream();

export const commandListener = (socket: Socket|SocketIOClient.Socket) => {

    socket.on(commandEvent, (arg: any) => {

        const command = arg.command;

        print(undefined, `Command : ${command}`);

        execute.execute(command)
            .then((result) => print(undefined, result.stdout))
            .catch((error) => print('error', error));

    });

};

export const fileSaveListener = (socket: Socket|SocketIOClient.Socket) => {

    socketStream.on(socket, fileSaveEvent, (readStream, id, options) => {

        print('job', `Receiving file : ${options.name}`);

        const target = path.posix.join(getDirectory(options.directory)!, options.name);
        const fileStream = fs.createWriteStream(target);
        readStream.pipe(fileStream);

    });

};

export const messageListener = (socket: Socket|SocketIOClient.Socket) => {

    socket.on(messageEvent, (arg: any) => {

        print(undefined, `Message : ${arg}`);

    });

};
