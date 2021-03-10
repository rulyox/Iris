import state from '../../state';
import execute from '../../execute';

const containerCreate = (options: any) => {

    if(!state.isConnected) {

        return {
            result: false,
            message: 'Not connected to a network'
        };

    }

    if(options?.image) {

        const image = options.image;

        execute.execute(execute.command.dockerRun(image))
            .then((result) => console.log(result))
            .catch((error) => console.log(error));

        return {
            result: true
        };

    }

    return {
        result: false
    };

};

export default containerCreate;
