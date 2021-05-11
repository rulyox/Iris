import state from '../../../state';
import execute from '../../../execute';
import ServiceResult from '../ServiceResult';
import broadcast from '../../../socket/broadcast';

const containerExecute = (options: any): ServiceResult => {

    if(!state.isConnected) return new ServiceResult(false, 'Not connected to a network');

    if(options.name !== undefined && options.command !== undefined && options.target !== undefined) {

        const command = execute.command.dockerExec(options.name, options.command);

        broadcast.broadcastCommand(command, options.target);

        return new ServiceResult(true, null);

    } else {

        return new ServiceResult(false, 'Wrong option');

    }

};

export default containerExecute;
