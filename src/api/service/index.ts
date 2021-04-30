import networkCreate from './command/networkCreate';
import networkJoin from './command/networkJoin';
import networkLeave from './command/networkLeave';
import fileSave from './command/fileSave';
import containerLoad from './command/containerLoad';
import containerCreate from './command/containerCreate';
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
        containerLoad: containerLoad,
        containerCreate: containerCreate,
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
