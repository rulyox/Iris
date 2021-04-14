import fs from 'fs';
import { getDirectory } from '../../../utility';

const file = (): any => {

    const imageFiles: string[] = [];
    const publicFiles: string[] = [];
    const privateFiles: string[] = [];

    fs.readdirSync(getDirectory('image')!).forEach((file) => imageFiles.push(file));
    fs.readdirSync(getDirectory('public')!).forEach((file) => publicFiles.push(file));
    fs.readdirSync(getDirectory('private')!).forEach((file) => privateFiles.push(file));

    return {
        image: imageFiles,
        public: publicFiles,
        private: privateFiles
    };

};

export default file;
