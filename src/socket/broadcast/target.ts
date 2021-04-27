import state from '../../state';

const getAllList = (): any[] => {

    const sockets: any[] = [];
    sockets.push(...Object.values(state.socketClients));
    sockets.push(...Object.values(state.socketServers));

    return sockets;

};

const getClientList = (): SocketIOClient.Socket[] => {

    return Object.values(state.socketClients);

};

const getById = (idList: string[]): any[] => {

    const sockets: any[] = [];
    const socketList = { ...state.socketClients, ...state.socketServers };

    for(const id of idList) {

        const socket = socketList[id];
        if(socket !== undefined) sockets.push(socket);

    }

    return sockets;

};

export default {
    getAllList: getAllList,
    getClientList: getClientList,
    getById: getById
};
