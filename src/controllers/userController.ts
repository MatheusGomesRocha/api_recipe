import { Request, Response } from "express";
import { User } from '../models/User';
import { unlink } from 'fs/promises';
import sharp from 'sharp';
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
    let email: string = req.body.email;
    let password: string = req.body.password;

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

    if(!hasUser) {              // Verifica se existir usuário, se não existir significa que o usuário digitou um email inexistente
        res.json({emailError: 'Incorrect email'})
    } else {                    // Se o email enviado existir...
        let bool = bcrypt.compareSync(password, hasUser.password);      // Compara a senha enviada com a senha encriptada no BD

        if(bool) {      // Se as duas senhas forem iguais, retorna as informações do usuário
            res.json({hasUser});
        } else {        // Se for incorreta, retorna erro de senha incorreta
            res.json({passwordError: 'Incorrect Password'});
        }
    }
}

export const getUserLoggedIn = async (req: Request, res: Response) => {
    let token = req.query.token;

    let userLoggedIn = await User.findOne({
        where: {
            id: token
        }
    });

    if(userLoggedIn) {
        res.json({result: 'Deu certo'});
    } else {
        res.json({result: 'Deu errado'});
    }

}

export const editProfile = async (req: Request, res: Response) => {
    let name: string = req.body.name;
    let email: string = req.body.email;
    let user: string = req.body.user;
    let token: number = req.body.token;
    
    if(req.file) {
        const filename = `${req.file.filename}.png`;
        await sharp(req.file.path)
            .resize(350, 350, {
                fit: 'fill'
            })
            .toFile(`./public/media/${filename}`);
    
        await unlink(req.file.path);

        let editProfile = await User.update({
            avatar: filename,
            name: name,
            email: email,
            user: user
        }, {
            where: {
                id: token
            }
        });
        
        if(editProfile) {
            res.json({ result: 'User edited'});
        } else {
            res.json({error: 'Something wrent wrong'});
        }
    } else {
        let editProfile = await User.update({
            name: name,
            email: email,
            user: user,
        }, {
            where: {
                id: token
            }
        });
        
        if(editProfile) {
            res.json({ result: 'User edited'});
        } else {
            res.json({error: 'Something wrent wrong'});
        }
    }
}