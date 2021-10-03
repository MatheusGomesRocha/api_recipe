const cors = require('cors');
import path from 'path';
import express from 'express';
import mainRoutes from './routes';
import dotenv from 'dotenv';

dotenv.config();    /** Habilita o uso das variáveis de ambientes localizadas no .env */

const server = express();       /** Inicia um servidor */

server.use(express.json());

server.use(cors());         /** Habilita com que o projeto possa ser usado como api */

server.use(express.static(path.join(__dirname, '../public')));

server.use(express.urlencoded({extended: false}));  /** Habilita basicamente com que possa ser usado o método POST */

server.use('/api/v1', mainRoutes);     /** Usa as rotas criadas em um arquivo diferente */

server.listen(process.env.PORT, () => {     /** Indica a porta que será usada para rodar o projeto */ 
    console.log('olá mundo');
});