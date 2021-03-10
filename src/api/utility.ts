import express from 'express';
import formidable from 'formidable';
import state from '../state';

export const parseForm = (request: express.Request): Promise<any> => {
    return new Promise((resolve, reject) => {

        try {

            const formParser = new formidable.IncomingForm();
            formParser.parse(request, function (error, fields, files) {

                if(error) {
                    reject(error);
                    return;
                }

                resolve({
                    command: fields.command,
                    directory: fields.directory,
                    name: fields.name,
                    files: Object.values(files)
                });

            });

        } catch(error) { reject(error); }

    });
};

export const getDirectory = (type: string): string|undefined => {

    if(type === 'image') return state.imageDirectory;
    else if(type === 'private') return state.privateDirectory;
    else if(type === 'public') return state.publicDirectory;
    else return undefined;

};
