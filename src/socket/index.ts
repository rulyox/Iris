import { startServer, endServer } from './server';
import { startClient, endClient } from './client';

export default {
    server: { startServer, endServer },
    client: { startClient, endClient }
};
