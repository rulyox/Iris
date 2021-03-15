import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import state from '../../state';
import execute from '../../execute';
import CommandResult from './CommandResult';
import broadcast from '../../socket/broadcast';
import { getDirectory } from '../utility';
import { print } from '../../utility';

const loadDockerImage = (path: string) => {

    execute.execute(execute.command.dockerLoad(path))
        .then((result) => print(result))
        .catch((error) => print(error));

};

const fileSave = (directory: string, name: string, file: formidable.File): CommandResult => {

    if(!state.isConnected) return new CommandResult(false, 'Not connected to a network');

    const oldPath = file.path;

    let newPath = getDirectory(directory);

    if(newPath !== undefined) {

        newPath = path.join(newPath, name);

        fs.renameSync(oldPath, newPath);

        print(`File saved : ${name}`);

        // load docker image
        if(directory === 'image') loadDockerImage(newPath);

    }

    broadcast.broadcastToClients(name);

    return new CommandResult(true, null);

};

export default fileSave;
