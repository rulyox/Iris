import express from 'express';
import bodyParser from 'body-parser';
import router from './router';
import state from '../../state';
import { print } from '../../utility';

export const startServer = () => {

    const port = state.apiPort;

    const app = express();

    app.use(bodyParser.json());

    app.use(router);

    app.listen(port, () => print(`API server running on port ${port}`));

};
