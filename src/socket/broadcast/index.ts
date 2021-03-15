import state from '../../state';
import { commandEvent } from "../event";

export default {

    broadcastToClients: (arg: any) => {

        const ooo: SocketIOClient.Socket[] = Object.values(state.socketClients);
        for(const socket of ooo) {

            socket.emit(commandEvent, arg);

        }

    }

};
