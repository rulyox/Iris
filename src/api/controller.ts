import express from 'express';
import commands from './command';

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

{
  "command": "run",
  "options": {

  }
}
*/
export const postCommand = (request: express.Request, response: express.Response, next: express.NextFunction) => {

    try {

        // parse request
        const command = request.body.command;
        const options = request.body.options;

        let result: boolean;
        let commandResult: any;

        console.log(`Command : ${command}`);

        switch(command) {

            case 'create':
                commandResult = commands.create(options);
                result = commandResult.result;
                break;

            case 'run':
                commandResult = commands.run();
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
