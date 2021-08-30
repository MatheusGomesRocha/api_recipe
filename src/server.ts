const cors = require('cors');

import express, { ErrorRequestHandler } from 'express';
import mainRoutes from './routes';
import dotenv from 'dotenv';
import { MulterError } from 'multer';

dotenv.config();    /** Habilita o uso das variáveis de ambientes localizadas no .env */

const server = express();       /** Inicia um servidor */

server.use(express.json());

server.use(cors());         /** Habilita com que o projeto possa ser usado como api */

server.use(express.urlencoded({extended: false}));  /** Habilita basicamente com que possa ser usado o método POST */

server.use(mainRoutes);     /** Usa as rotas criadas em um arquivo diferente */

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400);

    if(err instanceof MulterError) {
        res.json({ error: err.code });
    } else {
        console.log( err );
        res.json({ error: 'Ops, ocorreu um erro' });
    }
}

server.use(errorHandler);

server.listen(process.env.PORT, () => {     /** Indica a porta que será usada para rodar o projeto */ 
    console.log('olá mundo');
});