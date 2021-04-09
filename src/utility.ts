import state from './state';

const getTime = (): string => {

    const time = new Date();

    const date = ('0' + time.getDate()).slice(-2);
    const month = ('0' + (time.getMonth() + 1)).slice(-2);
    const year = time.getFullYear();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

};

export const print = (content: any) => {

    console.log(`${getTime().padEnd(20)}| ${content}`);

};

export const getDirectory = (type: string): string|undefined => {

    if(type === 'image') return state.imageDirectory;
    else if(type === 'private') return state.privateDirectory;
    else if(type === 'public') return state.publicDirectory;
    else return undefined;

};
