import io from 'socket.io-client';

let socket: any;

export const startClient = (ip: string, port: number) => {

    socket = io(`ws://${ip}:${port}`);

    socket.on('iris-message', (...args: any) => {
        console.log(args);
    });

    console.log(`Socket client connected`);

};

export const endClient = () => {

    socket.close();

    console.log(`Socket client ended`);

};
