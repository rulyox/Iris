import express from 'express';
import formidable from 'formidable';
import commands from '../commands';
import CommandResult from '../commands/CommandResult';
import ServerResult from './ServerResult';
import state from '../../state';
import { parseForm } from '../utility';
import { print } from '../../utility';

/*
network_create
network_join
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
  "command": "network_join",
  "options": {
    "ip": "111.222.333.444",
    "port": "8081",
    "key": "o23e9nfd54gpz"
  }
}

{
  "command": "container_create",
  "options": {
    "image": "hello-world:latest"
  }
}
*/
export const postCommand = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

    try {

        // parse request body
        const command = request.body.command;
        const password = request.body.password;
        const options = request.body.options;

        if(password !== state.password) {
            response.sendStatus(401);
            return;
        }

        // results
        let serverResult: ServerResult;
        let commandResult: CommandResult;

        print(`API : ${command}`);

        switch(command) {

            case 'network_create': {
                commandResult = commands.networkCreate(options);
                serverResult = new ServerResult(commandResult.result, commandResult.message);
                break;
            }

            case 'network_join': {
                commandResult = commands.networkJoin(options);
                serverResult = new ServerResult(commandResult.result, commandResult.message);
                break;
            }

            case 'network_leave': {
                commandResult = commands.networkLeave();
                serverResult = new ServerResult(commandResult.result, commandResult.message);
                break;
            }

            case 'container_create': {
                commandResult = commands.containerCreate(options);
                serverResult = new ServerResult(commandResult.result, commandResult.message);
                break;
            }

            default: {
                response.sendStatus(400);
                return;
            }

        }

        response.send(serverResult);

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
        const files: formidable.File[] = parsedForm.files;

        // results
        let serverResult: ServerResult;
        let commandResult: CommandResult;

        print(`API File : ${command}`);

        if(command !== undefined && (directory === 'image' || directory === 'private' || directory === 'public') && name !== undefined && files !== undefined && files.length === 1) {

            switch(command) {

                case 'save': {
                    const file: formidable.File = files[0];
                    commandResult = commands.fileSave(directory, name, file);
                    serverResult = new ServerResult(commandResult.result, commandResult.message);
                    break;
                }

                default: {
                    serverResult = new ServerResult(false, 'Wrong command');
                }

            }

        } else {

            serverResult = new ServerResult(false, 'Wrong request');

        }

        response.send(serverResult);

    } catch(error) { next(error); }

};
