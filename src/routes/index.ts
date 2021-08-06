import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

router.get('/contact', (req: Request, res: Response) => {
    res.send('Hello World Contact');
});

router.get('/about', (req: Request, res: Response) => {
    res.send('Hello World About');
});

router.post('/about', (req: Request, res: Response) => {
    
})

export default router;