import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import state from '../../../state';
import CommandResult from '../CommandResult';
import { getDirectory } from '../../../utility';
import { print } from '../../../utility';

const upload = (directory: string, name: string, file: formidable.File): CommandResult => {

    if(!state.isConnected) return new CommandResult(false, 'Not connected to a network');

    const oldPath = file.path;

    let newPath = getDirectory(directory);

    if(newPath !== undefined) {

        newPath = path.join(newPath, name);

        fs.renameSync(oldPath, newPath);

        print('done', `File saved : ${name}`);

    }

    return new CommandResult(true, null);

};

export default upload;
