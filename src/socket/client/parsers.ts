export const parseJoinResponse = (arg: any): {
    result: boolean,
    message: string|null,
    networkConfig: any
} => {

    if(typeof arg === 'object' && !(arg instanceof Array)) {

        if(arg?.networkConfig) {

            return { result: true, message: null, networkConfig: arg.networkConfig };

        } else {

            return { result: false, message: 'JoinResponse Error : Do not have network config', networkConfig: null };

        }

    } else {

        return { result: false, message: 'JoinResponse Error : Not an object', networkConfig: null };

    }

};
