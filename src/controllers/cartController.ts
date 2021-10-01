import { Request, Response } from "express";
import { Cart } from '../models/cart';

export const getCart = async (req: Request, res: Response) => {
    let userId = req.params.userId;
    
    let cart = await Cart.findAll({
        where: {
            userId: userId
        }
    });

    res.json({cart});
}

export const addToCart = async (req: Request, res: Response) => {
    let productName: string = req.body.productName;
    let productQuantity: number = req.body.productQuantity;
    let productPrice: number = req.body.productPrice;
    let userId: number = req.body.userId;

    let alreadyHaveOnCart = await Cart.findAll({
        where: {
            productName: productName,
            userId: userId,
        }
    })

    if(alreadyHaveOnCart) {
        let addToCart = await Cart.increment(
            { productQuantity: + productQuantity},
            {
                where: {
                    productName: productName,
                    userId: userId,
                }
            }
        )

        if(addToCart) {
            res.json({result: true});
        } else {
            res.json({result: false});
        }
    } else {
        let addToCart = await Cart.create({
            productName: productName,
            productQuantity: productQuantity,
            productPrice: productPrice,
            userId: userId,
        });
    
        if(addToCart) {
            res.json({result: true});
        } else {
            res.json({result: false});
        }
    }
}