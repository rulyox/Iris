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

export default {
    getAllList: getAllList,
    getClientList: getClientList
};
