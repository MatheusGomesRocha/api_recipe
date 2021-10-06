import { Request, Response, Router } from 'express';

import * as userController from '../controllers/userController';
import * as cartController from '../controllers/cartController';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    res.json({pong: true})
})

router.post('/create-user', userController.createUser);
router.post('/login', userController.login);

router.get('/cart/:userKey', cartController.getCart);
router.get('/cart-quantity/:email', cartController.getCartQuantity);
router.get('/cart-price/:email', cartController.getCartPrice);
router.post('/add-to-cart', cartController.addToCart);
router.post('/decrement-product', cartController.decrementQuantity);
router.post('/increment-product', cartController.incrementQuantity);
router.post('/delete-product', cartController.deleteFromCart);

export default router;