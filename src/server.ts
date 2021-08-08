const cors = require('cors');

import express from 'express';
import mainRoutes from './routes';
import dotenv from 'dotenv';

dotenv.config();    /** Habilita o uso das variáveis de ambientes localizadas no .env */

const server = express();       /** Inicia um servidor */

server.use(cors());         /** Habilita com que o projeto possa ser usado como api */
server.use(mainRoutes);     /** Usa as rotas criadas em um arquivo diferente */
server.use(express.urlencoded({extended: false}));  /** Habilita basicamente com que possa ser usado o método POST */

server.listen(process.env.PORT, () => {     /** Indica a porta que será usada para rodar o projeto */ 
    console.log('olá mundo');
});