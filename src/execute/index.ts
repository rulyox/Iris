import { execute } from './execute';
import { dockerLoad, dockerRun } from './command';

export default {
    execute: execute,
    command: {
        dockerLoad: dockerLoad,
        dockerRun: dockerRun
    }
};
