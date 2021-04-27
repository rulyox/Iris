import express from 'express';
import formidable from 'formidable';
import services from '../service';
import ServiceResult from '../service/ServiceResult';
import APIResult from './APIResult';
import state from '../../state';
import { parseForm } from '../utility';
import { print } from '../../utility';

/*
network_create
network_join
network_leave
file_save
file_fetch
container_load
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
  "command": "file_save",
  "options": {
    "target": "all",
    "directory": "image",
    "name": "image.tar"
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
        let apiResult: APIResult;
        let serviceResult: ServiceResult;

        print('api', `Command : ${command}`);

        switch(command) {

            case 'network_create': {
                serviceResult = services.command.networkCreate(options);
                apiResult = new APIResult(serviceResult.result, serviceResult.message);
                break;
            }

            case 'network_join': {
                serviceResult = services.command.networkJoin(options);
                apiResult = new APIResult(serviceResult.result, serviceResult.message);
                break;
            }

            case 'network_leave': {
                serviceResult = services.command.networkLeave();
                apiResult = new APIResult(serviceResult.result, serviceResult.message);
                break;
            }

            case 'file_save': {
                serviceResult = services.command.fileSave(options);
                apiResult = new APIResult(serviceResult.result, serviceResult.message);
                break;
            }

            case 'container_load': {
                serviceResult = services.command.containerCreate(options);
                apiResult = new APIResult(serviceResult.result, serviceResult.message);
                break;
            }

            case 'container_create': {
                serviceResult = services.command.containerCreate(options);
                apiResult = new APIResult(serviceResult.result, serviceResult.message);
                break;
            }

            default: {
                response.sendStatus(400);
                return;
            }

        }

        response.send(apiResult);

    } catch(error) { next(error); }

};

/*
upload
download
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
        let apiResult: APIResult;
        let serviceResult: ServiceResult;

        print('api', `File : ${command}`);

        if(command !== undefined && (directory === 'image' || directory === 'private' || directory === 'public') && name !== undefined && files !== undefined && files.length === 1) {

            switch(command) {

                case 'upload': {
                    const file: formidable.File = files[0];
                    serviceResult = services.file.upload(directory, name, file);
                    apiResult = new APIResult(serviceResult.result, serviceResult.message);
                    break;
                }

                default: {
                    apiResult = new APIResult(false, 'Wrong command');
                }

            }

        } else {

            apiResult = new APIResult(false, 'Wrong request');

        }

        response.send(apiResult);

    } catch(error) { next(error); }

};

/*
file
map
*/
export const postView = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

    try {

        // parse request body
        const command = request.body.command;
        const password = request.body.password;

        if(password !== state.password) {
            response.sendStatus(401);
            return;
        }

        // results
        let result: any;

        print('api', `View : ${command}`);

        switch(command) {

            case 'file': {
                result = services.view.file();
                break;
            }

            case 'map': {
                result = services.view.map();
                break;
            }

            default: {
                response.sendStatus(400);
                return;
            }

        }

        response.send(result);

    } catch(error) { next(error); }

};
