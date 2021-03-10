import express from 'express';
import bodyParser from 'body-parser';
import router from './router';

export const startServer = (port: number) => {

    const app = express();

    app.use(bodyParser.json());

    app.use(router);

    app.listen(port, () => console.log(`API server running on port ${port}`));

};
