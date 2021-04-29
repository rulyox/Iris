import { authEvent, requestAuthEvent, infoEvent, requestInfoEvent, joinEvent } from '../event';
import state from '../../state';
import { print } from '../../utility';

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
