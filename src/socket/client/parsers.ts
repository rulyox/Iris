export const parseJoinResponse = (arg: any): {
    result: boolean,
    message: string|null,
    networkConfig: any,
    id: string|null
} => {

    if(typeof arg === 'object' && !(arg instanceof Array)) {

        if(arg.networkConfig !== undefined && arg.id !== undefined) {

            return { result: true, message: null, networkConfig: arg.networkConfig, id: arg.id };

        } else {

            return { result: false, message: 'JoinResponse Error : Do not have network config', networkConfig: null, id: null };

        }

    } else {

        return { result: false, message: 'JoinResponse Error : Not an object', networkConfig: null, id: null };

    }

};
