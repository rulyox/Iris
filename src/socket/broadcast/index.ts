import fs from 'fs';
import { SocketStream } from 'stream-socket.io';
import { getTargetSockets } from './target';
import { fileEvent } from '../event';
import { print } from '../../utility';

const socketStream = new SocketStream();

const broadcastFile = (path: string, name: string, targetSockets: any) => {

    const sockets: any[] = getTargetSockets(targetSockets);

    print('job', `Broadcasting file : ${name}`);

    for(const socket of sockets) {

        const writeStream = socketStream.emit(socket, fileEvent, { name: name });

        const fileStream = fs.createReadStream(path);
        fileStream.pipe(writeStream);

    }

};

export default {
    broadcastFile: broadcastFile
};
