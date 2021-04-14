import networkCreate from './networkCreate';
import networkJoin from './networkJoin';
import networkLeave from './networkLeave';
import fileSave from './fileSave';
import containerCreate from './containerCreate';
import upload from './file/upload';

export default {
    networkCreate: networkCreate,
    networkJoin: networkJoin,
    networkLeave: networkLeave,
    fileSave: fileSave,
    containerCreate: containerCreate,
    file: {
        upload: upload
    }
};
