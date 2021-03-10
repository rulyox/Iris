import fs from 'fs';
import state from './state';

const createDirectory = () => {

    if(!fs.existsSync(state.workspaceDirectory)) fs.mkdirSync(state.workspaceDirectory);
    if(!fs.existsSync(state.imageDirectory)) fs.mkdirSync(state.imageDirectory);
    if(!fs.existsSync(state.privateDirectory)) fs.mkdirSync(state.privateDirectory);
    if(!fs.existsSync(state.publicDirectory)) fs.mkdirSync(state.publicDirectory);

};

const initialize = () => {

    createDirectory();

};

export default initialize;
