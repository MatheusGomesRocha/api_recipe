import { Request, Response } from "express";
import { User } from '../models/User';

export const getUsers = async (req: Request, res: Response) => {
    let users = await User.findAll();
    console.log(JSON.stringify(users));
}

export const createUser = async (req: Request, res: Response) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    let randomNumber = Math.random() * (9999 - 1000);   // Pega um numero aleatório entre 1000 e 9999

    let user = name + Math.floor(randomNumber);         // Junta o número aleatório pego acima com o name, mas o numero aleatório é arredondado para não ter casas decimais

    let hasEmailCreated = await User.findOne({
        where: {
            email: email,
        }
    })

    if(hasEmailCreated) {
        res.json({error: 'Already has an user with this email'});
    } else {
        let createUser = await User.create({
            name: name,
            email: email,
            user: user,
            password: password,
        });

        if(createUser) {
            res.json({result: true});
        } else {
            res.json({result: false});
        }
    }
}