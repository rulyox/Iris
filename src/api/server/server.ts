import express from 'express';
import bodyParser from 'body-parser';
import router from './router';
import { print } from '../../utility';

export const startServer = (port: number) => {

    const app = express();

    app.use(bodyParser.json());

    app.use(router);

    app.listen(port, () => print(`API server running on port ${port}`));

};
