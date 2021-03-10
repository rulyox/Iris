import state from '../../state';
import execute from '../../execute';

const containerCreate = () => {

    if(!state.isConnected) {

        return {
            result: false,
            message: 'Not connected to a network'
        };

    }

    execute.execute('echo Hello World!')
        .then((result) => console.log(result));

    return {
        result: true
    };

};

export default containerCreate;
