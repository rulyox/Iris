import fs from 'fs';
import yargs from 'yargs';
import state from './state';

const parseArguments = (): {
    ip: string,
    api: number,
    socket: number,
    password: string
} => {

    const argv = yargs(process.argv.slice(2))
        .options({
            ip: { type: 'string' },
            api: { type: 'number' },
            socket: { type: 'number' },
            password: { type: 'string' }
        })
        .demandOption(['ip', 'api', 'socket', 'password'])
        .argv;

    return {
        ip: argv.ip,
        api: argv.api,
        socket: argv.socket,
        password: argv.password
    };

};

const setState = (ip: string, api: number, socket: number, password: string) => {

    state.ip = ip;
    state.apiPort = api;
    state.socketPort = socket;
    state.password = password;

};

const createDirectory = () => {

    if(!fs.existsSync(state.workspaceDirectory)) fs.mkdirSync(state.workspaceDirectory);
    if(!fs.existsSync(state.imageDirectory)) fs.mkdirSync(state.imageDirectory);
    if(!fs.existsSync(state.privateDirectory)) fs.mkdirSync(state.privateDirectory);
    if(!fs.existsSync(state.publicDirectory)) fs.mkdirSync(state.publicDirectory);

};

const initialize = () => {

    const { ip, api, socket, password } = parseArguments();
    setState(ip, api, socket, password);
    createDirectory();

};

export default initialize;
