import { Request, Response } from "express";
import { Refrigerator } from '../models/Refrigerator';
import sharp from 'sharp';
import { unlink } from 'fs/promises';

export const getUserRefrigerator = async (req: Request, res: Response) => {
    let token = req.params.token;

    let refrigerator = await Refrigerator.findAll({
        where: {
            userId: token
        }
    });

    if(refrigerator) {
        res.json({refrigerator});
    } else {
        res.json({error: 'Something wrent wrong...'})
    }
}

export const addFoodInRefrigerator = async (req: Request, res: Response) => {
    if(req.file) {
        let userId: number = req.body.userId;
        let name: string = req.body.name;
        let quantity: number = req.body.quantity;
        let quantityType: string = req.body.quantityType;
        let addedAt: string = req.body.addedAt;
        let expireAt: string = req.body.expireAt;

        const filename = `${req.file.filename}.png`;
        await sharp(req.file.path)
            .resize(100, 100, {
                fit: 'fill'
            })
            .toFile(`./public/media/${filename}`);
    
        await unlink(req.file.path);

        let insertData = await Refrigerator.create({
            userId: userId,
            name: name,
            quantity: quantity,
            quantityType: quantityType,
            addedAt: addedAt,
            expireAt: expireAt,
            img: filename
        });

        if(insertData) {
            res.json({result: 'Food added successufuly'});
        } else {
            res.json({error: 'Something wrent wrong...'});
        }
    }
}

export const deleteFoodFromRefrigerator = async (req: Request, res: Response) => {
    let id = req.body.id;

    let deleteFood = await Refrigerator.destroy({
        where: {
            id: id
        }
    });

    if(deleteFood) {
        res.json({result: 'Food Deleted'});
    } else {
        res.json({error: 'Something wrent wrong'});
    }
}