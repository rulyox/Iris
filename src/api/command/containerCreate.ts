import state from '../../state';
import execute from '../../execute';
import CommandResult from './CommandResult';

const containerCreate = (options: any): CommandResult => {

    if(!state.isConnected) return new CommandResult(false, 'Not connected to a network');

    if(options?.image) {

        const image = options.image;

        execute.execute(execute.command.dockerRun(image))
            .then((result) => console.log(result))
            .catch((error) => console.log(error));

        return new CommandResult(true, null);

    } else {

        return new CommandResult(false, 'Wrong option');

    }

};

export default containerCreate;
