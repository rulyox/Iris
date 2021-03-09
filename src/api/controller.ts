import express from 'express';
import commandCreate from './command/create';

/*
{
  "command": "create",
  "options": {
    "config": {
      "mode": "master_slave",
      "key": "o23e9nfd54gpz"
    }
  }
}
*/
export const postCommand = (request: express.Request, response: express.Response, next: express.NextFunction) => {

    try {

        // parse request
        const command = request.body.command;
        const options = request.body.options;

        let result;

        switch(command) {

            case 'create':
                console.log('Command : create');
                const commandResult: any = commandCreate(options);
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
