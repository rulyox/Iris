import state from '../../state';
import socket from '../../socket';
import CommandResult from './CommandResult';

const networkLeave = (): CommandResult => {

    if(!state.isConnected) return new CommandResult(false, 'Not connected to a network');

    socket.client.endClient();
    state.isConnected = false;

    return new CommandResult(true, null);

};

export default networkLeave;
