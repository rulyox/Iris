import fs from 'fs';
import state from '../../state';
import { SocketStream } from 'stream-socket.io';
import { commandEvent, fileEvent } from '../event';

const socketStream = new SocketStream();

const broadcastFile = (path: string, name: string) => {

    const sockets: SocketIOClient.Socket[] = Object.values(state.socketClients);

    for(const socket of sockets) {

        const writeStream = socketStream.emit(socket, fileEvent, { name: name });

        const fileStream = fs.createReadStream(path);
        fileStream.pipe(writeStream);

    }

};

export default {

    broadcastToClients: (arg: any) => {

        const ooo: SocketIOClient.Socket[] = Object.values(state.socketClients);
        for(const socket of ooo) {

            socket.emit(commandEvent, arg);

        }

    },
    broadcastFile: broadcastFile

};
