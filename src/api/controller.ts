import express from 'express';
import commands from './command';
import { parseForm } from './utility';

/*
network_create
network_connect
network_leave
container_create
container_remove
container_execute

{
  "command": "network_create",
  "options": {
    "config": {
      "mode": "master_slave",
      "key": "o23e9nfd54gpz"
    }
  }
}

{
  "command": "container_create",
  "options": {
    "image": "hello-world"
  }
}
*/
export const postCommand = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

    try {

        // parse request body
        const command = request.body.command;
        const options = request.body.options;

        let result: boolean;
        let commandResult: any;

        console.log(`Command : ${command}`);

        switch(command) {

            case 'network_create':
                commandResult = commands.networkCreate(options);
                result = commandResult.result;
                break;

            case 'container_create':
                commandResult = commands.containerCreate();
                result = commandResult.result;
                break;

            default:
                result = false;

        }

        response.send({
            result: result
        });

    } catch(error) { next(error); }

};

/*
file_save
file_fetch
*/
export const postFile = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

    try {

        // parse request form
        const parsedForm = await parseForm(request);
        const command: string = parsedForm.command;
        const directory: string = parsedForm.directory;
        const name: string = parsedForm.name;
        const files = parsedForm.files;

        if(command !== undefined && (directory === 'image' || directory === 'private' || directory === 'public') && name !== undefined && files !== undefined) {

            let result: boolean;
            let commandResult: any;

            switch(command) {

                case 'save':
                    commandResult = commands.fileSave(directory, name, files);
                    result = commandResult.result;
                    break;

                default:
                    result = false;

            }

            response.send({
                result: result
            });

        } else {

            response.send({
                result: false
            });

        }

    } catch(error) { next(error); }

};
