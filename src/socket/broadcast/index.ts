import fs from 'fs';
import { SocketStream } from 'stream-socket.io';
import target from './target';
import { commandEvent, fileEvent } from '../event';

const socketStream = new SocketStream();

const broadcastFile = (path: string, name: string, targetSockets: any) => {

    let sockets = [];

    if(targetSockets === 'all') {

        sockets = target.getAllList();

    } else if(targetSockets.isArray()) {

        sockets = [];

    }

    console.log(sockets);

    for(const socket of sockets) {

        const writeStream = socketStream.emit(socket, fileEvent, { name: name });

        const fileStream = fs.createReadStream(path);
        fileStream.pipe(writeStream);

    }

};

const broadcastToClients =  (arg: any) => {

    const sockets = target.getClientList();

    for(const socket of sockets) {

        socket.emit(commandEvent, arg);

    }

};

export default {
    broadcastFile: broadcastFile,
    broadcastToClients: broadcastToClients
};
