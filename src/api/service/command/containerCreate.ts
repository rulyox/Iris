import state from '../../../state';
import execute from '../../../execute';
import ServiceResult from '../ServiceResult';
import { print } from '../../../utility';

const containerCreate = (options: any): ServiceResult => {

    if(!state.isConnected) return new ServiceResult(false, 'Not connected to a network');

    if(options?.image) {

        const image = options.image;

        execute.execute(execute.command.dockerRun(image))
            .then((result) => print(undefined, result))
            .catch((error) => print('error', error));

        return new ServiceResult(true, null);

    } else {

        return new ServiceResult(false, 'Wrong option');

    }

};

export default containerCreate;
