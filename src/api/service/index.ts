import networkCreate from './command/networkCreate';
import networkJoin from './command/networkJoin';
import networkLeave from './command/networkLeave';
import fileSave from './command/fileSave';
import fileFetch from './command/fileFetch';
import containerLoad from './command/containerLoad';
import containerCreate from './command/containerCreate';
import containerExecute from './command/containerExecute';
import containerRemove from './command/containerRemove';
import upload from './file/upload';
import file from './view/file';
import map from './view/map';

export default {
    command: {
        networkCreate: networkCreate,
        networkJoin: networkJoin,
        networkLeave: networkLeave,
        fileSave: fileSave,
        fileFetch: fileFetch,
        containerLoad: containerLoad,
        containerCreate: containerCreate,
        containerExecute: containerExecute,
        containerRemove: containerRemove
    },
    file: {
        upload: upload
    },
    view: {
        file: file,
        map: map
    }
};
