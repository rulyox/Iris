import express from 'express';
import formidable from 'formidable';

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
