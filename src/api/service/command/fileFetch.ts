import state from '../../../state';
import { fileFetchEvent } from '../../../socket/event';
import { getTargetSockets } from '../../../socket/broadcast/target';
import ServiceResult from '../ServiceResult';

const fileFetch = (options: any): ServiceResult => {

    if(!state.isConnected) return new ServiceResult(false, 'Not connected to a network');

    if(options.source !== undefined && options.directory !== undefined && options.name !== undefined && options.target !== undefined) {

        const sockets: any[] = getTargetSockets([options.source]);

        if(sockets.length === 1) {

            const socket = sockets[0];
            socket.emit(fileFetchEvent, { directory: options.directory, name: options.name, target: options.target });

        }

        return new ServiceResult(true, null);

    } else {

        return new ServiceResult(false, 'Wrong option');

    }

};

export default fileFetch;
