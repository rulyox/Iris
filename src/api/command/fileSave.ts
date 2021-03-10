import fs from 'fs';
import path from 'path';
import execute from '../../execute';
import { getDirectory } from '../utility';

const loadDockerImage = (path: string) => {

    execute.execute(execute.command.dockerLoad(path))
        .then((result) => console.log(result))
        .catch((error) => console.log(error));

};

const fileSave = (directory: string, name: string, files: any) => {

    for(const file of files) {

        const oldPath = file.path;

        let newPath = getDirectory(directory);

        if(newPath !== undefined) {

            newPath = path.join(newPath, name);

            fs.renameSync(oldPath, newPath);

            // load docker image
            if(directory === 'image') loadDockerImage(newPath);

        }

    }

    return {
        result: true
    };

};

export default fileSave;
