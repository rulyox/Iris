import express from 'express';
import { postCommand } from './controller';

const router = express.Router();

router.get('/', (request, response) => {

    response.send('Iris');

});

router.post('/command', postCommand);

export default router;
