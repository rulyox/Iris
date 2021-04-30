import path from 'path';
import state from '../../../state';
import ServiceResult from '../ServiceResult';
import broadcast from '../../../socket/broadcast';
import { getDirectory } from '../../../utility';

const fileSave = (options: any): ServiceResult => {

    if(!state.isConnected) return new ServiceResult(false, 'Not connected to a network');

    if(options.directory !== undefined && options.name !== undefined && options.target !== undefined) {

        let filePath = getDirectory(options.directory);

        if(filePath !== undefined) {

            filePath = path.posix.join(filePath, options.name);

            broadcast.broadcastFile(filePath, options.directory, options.name, options.target);

        }

        return new ServiceResult(true, null);

    } else {

        return new ServiceResult(false, 'Wrong option');

    }

};

export default fileSave;
