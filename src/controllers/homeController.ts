import { Request, Response } from "express";
import { User } from '../models/User';

export const home = async (req: Request, res: Response) => {
    let users = await User.findAll();
    console.log(JSON.stringify(users));
}

export const createUser = async (req: Request, res: Response) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

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
            password: password,
        });
    }
}