import path from 'path';
import state from '../../state';
import CommandResult from './CommandResult';
import broadcast from '../../socket/broadcast';
import {getDirectory, print} from '../../utility';

const fileSave = (options: any): CommandResult => {

    if(!state.isConnected) return new CommandResult(false, 'Not connected to a network');

    if(options.directory !== undefined && options.name !== undefined) {

        let filePath = getDirectory(options.directory);

        if(filePath !== undefined) {

            filePath = path.join(filePath, options.name);

            broadcast.broadcastFile(filePath, options.name);

        }

        return new CommandResult(true, null);

    } else {

        return new CommandResult(false, 'Wrong option');

    }

};

export default fileSave;
