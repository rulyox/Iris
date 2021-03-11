import state from '../../state';
import socket from '../../socket';
import CommandResult from './CommandResult';

const networkCreate = (options: any): CommandResult => {

    if(state.isConnected) return new CommandResult(false, 'Already connected to a network');

    if(options?.config) {

        const config = options.config;

        if(config?.mode && config?.key) {

            const networkConfig = {
                mode: config.mode,
                key: config.key
            };

            socket.server.startServer();

            // set state
            state.isConnected = true;
            state.isGenesis = true;
            state.networkConfig = networkConfig;

            return new CommandResult(true, null);

        } else {

            return new CommandResult(false, 'Config has missing keys');

        }

    } else {

        return new CommandResult(false, 'Wrong option');

    }

};

export default networkCreate;
