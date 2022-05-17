import { Router } from 'express';
const router = Router();

import userController from '../controllers/userController';

router.post('/', userController.createUser);
router.post('/login', userController.loginUser);

export default router;
