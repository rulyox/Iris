import state from '../../state';
import { execute } from '../../execute/execute';

const run = () => {

    if(!state.isConnected) {

        return {
            result: false,
            message: 'Not connected to a network'
        };

    }

    execute('echo Hello World!').then(result => console.log(result));

    return {
        result: true
    };

};

export default run;
