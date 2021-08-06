import express, { Request, Response } from 'express';
import path from 'path';
import mainRoutes from './routes/index';

const server = express();

server.use(express.static(path.join(__dirname, '../public')));

server.use(express.urlencoded({extended: true}));

server.use(mainRoutes);

server.use((req: Request, res: Response) => {
    res.status(404).send('Page not found');
});

server.listen(3000);