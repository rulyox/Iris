import path from 'path';
import state from '../../../state';
import execute from '../../../execute';
import ServiceResult from '../ServiceResult';
import broadcast from '../../../socket/broadcast';
import { getDirectory } from '../../../utility';

const containerLoad = (options: any): ServiceResult => {

    if(!state.isConnected) return new ServiceResult(false, 'Not connected to a network');

    if(options.image !== undefined && options.target !== undefined) {

        let filePath = getDirectory('image');

        if(filePath !== undefined) {

            filePath = path.posix.join(filePath, options.image);

            const command = execute.command.dockerLoad(filePath);

            broadcast.broadcastCommand(command, options.target);

        }

        return new ServiceResult(true, null);

    } else {

        return new ServiceResult(false, 'Wrong option');

    }

};

export default containerLoad;
