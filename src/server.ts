require('dotenv').config();
import express, { Request, Response } from 'express';
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.urlencoded({extended: false}));

server.get('/ping', (req: Request, res: Response) => {
    res.json({pong: true})
})

server.listen(process.env.PORT, () => {
    console.log('olá mundo');
});
