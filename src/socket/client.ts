import io from 'socket.io-client';
import { print } from '../utility';

let socket: any;

export const startClient = (ip: string, port: number, key: string) => {

    socket = io(`ws://${ip}:${port}`);

    socket.on('iris-message', (arg: any) => {
        print(arg);
    });

    socket.emit('iris-auth', {
        key: key
    });

    print(`Socket client connected`);

};

export const endClient = () => {

    socket.close();

    print(`Socket client ended`);

};
