import fs from 'fs';
import { SocketStream } from 'stream-socket.io';
import { getTargetSockets } from './target';
import { fileEvent, commandEvent } from '../event';
import { print } from '../../utility';

const socketStream = new SocketStream();

const broadcastFile = (path: string, directory: string, name: string, target: any) => {

    const sockets: any[] = getTargetSockets(target);

    print('job', `Broadcasting file : ${name}`);

    for(const socket of sockets) {

        const writeStream = socketStream.emit(socket, fileEvent, { directory: directory, name: name });

        const fileStream = fs.createReadStream(path);
        fileStream.pipe(writeStream);

    }

};

const broadcastCommand = (command: string, target: any) => {

    const sockets: any[] = getTargetSockets(target);

    print('job', `Broadcasting command : ${command}`);

    for(const socket of sockets) {

        socket.emit(commandEvent, { command: command });

    }

};

export default {
    broadcastFile: broadcastFile,
    broadcastCommand: broadcastCommand
};
