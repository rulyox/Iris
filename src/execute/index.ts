import { execute } from './execute';
import { dockerLoad } from './command';

export default {
    execute: execute,
    command: {
        dockerLoad: dockerLoad
    }
};
