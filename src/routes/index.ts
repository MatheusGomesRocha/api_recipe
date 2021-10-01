import { Request, Response, Router } from 'express';

import * as userController from '../controllers/userController';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    res.json({pong: true})
})

router.post('/create-user', userController.createUser);
router.post('/login', userController.login);

export default router;