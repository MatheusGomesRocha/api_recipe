import { Request, Response, Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    res.json({pong: true})
})

router.get('/', userController.getUsers);

router.post('/create-user', userController.createUser);

router.get('/contact', (req: Request, res: Response) => {
    res.send('Hello World Contact');
});

router.get('/about', (req: Request, res: Response) => {
    res.send('Hello World About');
});

router.post('/about', (req: Request, res: Response) => {
    
})

export default router;