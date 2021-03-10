import io from 'socket.io-client';
import { print } from '../utility';

let socket: any;

export const startClient = (ip: string, port: number) => {

    socket = io(`ws://${ip}:${port}`);

    socket.on('iris-message', (...args: any) => {
        print(args);
    });

    print(`Socket client connected`);

};

export const endClient = () => {

    socket.close();

    print(`Socket client ended`);

};
