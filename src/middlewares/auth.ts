import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

export async function auth (req: Request, res: Response, next: NextFunction) {
    if(!req.query.token && !req.body.token && !req.params.token) {
        res.json({notAllawoed: true});
        return;
    }

    const user = await User.findOne({
        where: {
            id:  req.params.token,
        }
    })

    if(!user) {
        res.json({notAllawoed: true});
        return;
    }

    next();
}