import express from 'express';
import { postCommand, postFile, postView } from './controller';

const router = express.Router();

router.get('/', (request, response) => {

    response.send('Iris');

});

router.post('/command', postCommand);
router.post('/file', postFile);
router.post('/view', postView);

export default router;
