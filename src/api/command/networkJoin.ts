import state from '../../state';
import socket from '../../socket';
import CommandResult from './CommandResult';

const networkJoin = (options: any): CommandResult => {

    if(state.isConnected) return new CommandResult(false, 'Already connected to a network');

    if(options?.ip && options?.port && options?.key) {

        const ip = options.ip;
        const port = options.port;
        const key = options.key;

        socket.client.startClient(ip, port);

        return new CommandResult(true, null);

    } else {

        return new CommandResult(false, 'Wrong option');

    }

};

export default networkJoin;
