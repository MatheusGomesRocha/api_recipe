import { Request, Response } from "express";
import { User } from '../models/User';
import sgMail from '@sendgrid/mail';
const bcrypt = require('bcrypt');

export const getUsers = async (req: Request, res: Response) => {
    let users = await User.findAll();
    res.json({users});
}

export const hasUser = async (req: Request, res: Response) => {
    let email: string = req.params.email;

    let hasEmailCreated = await User.findOne({
        where: {
            email: email,
        }
    })

    if(hasEmailCreated) {
        res.json({error: 'Already has an user with this email'});
    } else {
        res.json({success: 'Ready to go'});
    }
}

export const sendVerificationCode = (req: Request, res: Response) => {
    let email = req.body.email;

    const API_KEY = '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';

    sgMail.setApiKey(API_KEY);

    let randomNumber = Math.floor(Math.random() * (9999 - 1000));   // Pega um numero aleatório entre 1000 e 9999

    const message = {
        to: email,
        from: 'matheusgomes192@hotmail.com',
        subject: 'Confirm your sign up',
        text: `Confirm your sign up with this code ${randomNumber}`,
    };

    sgMail.send(message)
    .then((response) => res.json({result: 'Email send', code: randomNumber}))
    .catch((err) => res.json({err}));
}

export const createUser = async (req: Request, res: Response) => {
    let name = req.body.name;
    let email: String = req.body.email;
    let password: String = req.body.password;

    let randomNumber = Math.random() * (9999 - 1000);   // Pega um numero aleatório entre 1000 e 9999

    let user = name + Math.floor(randomNumber);         // Junta o número aleatório pego acima com o name, mas o numero aleatório é arredondado para não ter casas decimais

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

export const login = async (req: Request, res: Response) => {
    let email = req.body.email;
    let password = req.body.password;

    let hasUser = await User.findOne({
        where: {
            email: email,
        }
    })

    if(!hasUser) {
        res.json({error: 'Incorrect email'})
    } else {
        let bool = bcrypt.compareSync(password, hasUser.password);

        if(bool) {
            res.json({hasUser});
        } else {
            res.json({error: 'Incorrect Password'});
        }
    }
}