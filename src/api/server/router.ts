import express from 'express';
import { postCommand, postFile } from './controller';

const router = express.Router();

router.get('/', (request, response) => {

    response.send('Iris');

});

router.post('/command', postCommand);
router.post('/file', postFile);

export default router;
