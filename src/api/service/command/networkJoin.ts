import state from '../../../state';
import socket from '../../../socket';
import ServiceResult from '../ServiceResult';

const networkJoin = (options: any): ServiceResult => {

    if(state.isConnected) return new ServiceResult(false, 'Already connected to a network');

    if(options?.ip && options?.port && options?.key) {

        const ip = options.ip;
        const port = options.port;
        const key = options.key;

        socket.client.startClient(ip, port, key);

        return new ServiceResult(true, null);

    } else {

        return new ServiceResult(false, 'Wrong option');

    }

};

export default networkJoin;
