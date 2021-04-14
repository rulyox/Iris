import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import state from '../../../state';
import ServiceResult from '../ServiceResult';
import { getDirectory, print } from '../../../utility';

const upload = (directory: string, name: string, file: formidable.File): ServiceResult => {

    if(!state.isConnected) return new ServiceResult(false, 'Not connected to a network');

    const oldPath = file.path;

    let newPath = getDirectory(directory);

    if(newPath !== undefined) {

        newPath = path.join(newPath, name);

        fs.renameSync(oldPath, newPath);

        print('done', `File saved : ${name}`);

    }

    return new ServiceResult(true, null);

};

export default upload;
