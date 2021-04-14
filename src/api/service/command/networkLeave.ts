import state from '../../../state';
import socket from '../../../socket';
import ServiceResult from '../ServiceResult';

const networkLeave = (): ServiceResult => {

    if(!state.isConnected) return new ServiceResult(false, 'Not connected to a network');

    socket.server.endServer();
    socket.client.endClient();

    state.isConnected = false;

    return new ServiceResult(true, null);

};

export default networkLeave;
