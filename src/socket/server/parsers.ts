import state from '../../state';

export const parseAuth = (arg: any): {
    result: boolean,
    message: string|null
} => {

    if(typeof arg === 'object' && !(arg instanceof Array)) {

        if(arg?.key) {

            if(state.networkConfig.key === arg.key) {

                return { result: true, message: null };

            } else {

                return { result: false, message: 'Auth Error : Wrong key' };

            }

        } else {

            return { result: false, message: 'Auth Error : Do not have key' };

        }

    } else {

        return { result: false, message: 'Auth Error : Not an object' };

    }

};

export const parseInfo = (arg: any): {
    result: boolean,
    message: string|null,
    name: string|null,
    ip: string|null,
    apiPort: number|null,
    socketPort: number|null
} => {

    if(typeof arg === 'object' && !(arg instanceof Array)) {

        if(arg?.name && arg?.ip && arg?.apiPort && arg?.socketPort) {

            return { result: true, message: null, name: arg.name, ip: arg.ip, apiPort: arg.apiPort, socketPort: arg.socketPort };

        } else {

            return { result: false, message: 'Info Error : Do not have name', name: null, ip: null, apiPort: null, socketPort: null };

        }

    } else {

        return { result: false, message: 'Info Error : Not an object', name: null, ip: null, apiPort: null, socketPort: null };

    }

};
