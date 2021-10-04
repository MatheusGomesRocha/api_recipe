import { Request, Response } from "express";
import { User } from '../models/User';
const bcrypt = require('bcrypt');

export const createUser = async (req: Request, res: Response) => {
    let email: string = req.body.email;
    let password: string = req.body.password;

    let hasUser = await User.findOne({
        where: {
            email: email,
        }
    })

    if(hasUser) {
        res.json({error: 'Email already exists'});
    } else {
        let createUser = await User.create({
            email: email,
            password: password,
        });
    
        if(createUser) {
            res.json({result: true});
        } else {
            res.json({error: 'Something wrent wrong...'});
        }
    }
}

export const login = async (req: Request, res: Response) => {
    let email = req.body.email;
    let password = req.body.password;

    let hasUser = await User.findOne({
        where: {
            email: email,
        }
    })

    if(!hasUser) {              // Verifica se existir usuário, se não existir significa que o usuário digitou um email inexistente
        res.json({error: 'Email does not exist'})
    } else {                    // Se o email enviado existir...
        let bool = bcrypt.compareSync(password, hasUser.password);      // Compara a senha enviada com a senha encriptada no BD

        if(bool) {      // Se as duas senhas forem iguais, retorna as informações do usuário
            res.json({hasUser});
        } else {        // Se for incorreta, retorna erro de senha incorreta
            res.json({error: 'Incorrect Password'});
        }
    }
}
