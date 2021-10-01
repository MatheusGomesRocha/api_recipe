import { Request, Response, Router } from 'express';

import * as userController from '../controllers/userController';
import * as cartController from '../controllers/cartController';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    res.json({pong: true})
})

router.post('/create-user', userController.createUser);
router.post('/login', userController.login);

router.get('/cart/:userId', cartController.getCart);
router.post('/add-to-cart', cartController.addToCart);

export default router;