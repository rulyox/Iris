import networkCreate from './command/networkCreate';
import networkJoin from './command/networkJoin';
import networkLeave from './command/networkLeave';
import fileSave from './command/fileSave';
import containerCreate from './command/containerCreate';
import upload from './file/upload';
import file from './view/file';

export default {
    command: {
        networkCreate: networkCreate,
        networkJoin: networkJoin,
        networkLeave: networkLeave,
        fileSave: fileSave,
        containerCreate: containerCreate
    },
    file: {
        upload: upload
    },
    view: {
        file: file
    }
};
