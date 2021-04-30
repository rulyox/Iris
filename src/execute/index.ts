import { execute } from './execute';
import { dockerLoad, dockerRun, dockerRm } from './command';

export default {
    execute: execute,
    command: {
        dockerLoad: dockerLoad,
        dockerRun: dockerRun,
        dockerRm: dockerRm
    }
};
