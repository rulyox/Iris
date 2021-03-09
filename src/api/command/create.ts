import state from '../../state';
import socket from '../../socket';

const create = (options: any) => {

    if(state.isConnected) {

        return {
            result: false,
            message: 'Already connected to a network'
        };

    }

    if(options?.config) {

        const config = options.config;

        if(config?.mode && config?.key) {

            const networkConfig = {
                mode: config.mode,
                key: config.key
            };

            socket.server.startServer(8081);

            // set state
            state.isConnected = true;
            state.isGenesis = true;
            state.networkConfig = networkConfig;

            return {
                result: true
            };

        } else {

            return {
                result: false,
                message: 'Config has missing keys'
            };

        }

    } else {

        return {
            result: false,
            message: 'Config does not exist'
        };

    }

};

export default create;
