import { Request, Response } from "express";
import { Refrigerator } from '../models/Refrigerator';

export const getUserRefrigerator = async (req: Request, res: Response) => {
    let refrigerators = await Refrigerator.findAll();
    res.json({refrigerators});
}

export const addFoodInRefrigerator = async (req: Request, res: Response) => {
    let userId: number = req.body.userId;
    let name: string = req.body.name;
    let quantity: number = req.body.quantity;
    let quantityType: string = req.body.quantityType;
    let expireAt: string = req.body.expireAt;

    let insertData = await Refrigerator.create({
        userId: userId,
        name: name,
        quantity: quantity,
        quantityType: quantityType,
        expireAt: expireAt,
    });

    if(insertData) {
        res.json({result: 'deu certo'});
    } else {
        res.json({error: 'deu errado'});
    }
}