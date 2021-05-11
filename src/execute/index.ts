import { execute } from './execute';
import { dockerLoad, dockerRun, dockerExec, dockerRm } from './command';

export default {
    execute: execute,
    command: {
        dockerLoad: dockerLoad,
        dockerRun: dockerRun,
        dockerExec: dockerExec,
        dockerRm: dockerRm
    }
};
