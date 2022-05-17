import { Router } from 'express';
const router = Router();
import loginRequired from '../middlewares/loginRequired';

import cepController from '../controllers/cepController';

router.post('/', loginRequired, cepController.findCep);

export default router;
