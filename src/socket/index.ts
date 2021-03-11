import { startServer, endServer } from './server/server';
import { startClient, endClient } from './client/client';

export default {
    server: { startServer, endServer },
    client: { startClient, endClient }
};
