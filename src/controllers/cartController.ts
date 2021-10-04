import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { Cart } from '../models/Cart';

export const getCart = async (req: Request, res: Response) => {
    let email = req.params.userKey;
    
    let cart = await Cart.findAll({
        where: {
            userKey: email
        }
    });

    res.json({cart});
}

export const addToCart = async (req: Request, res: Response) => {
    let productName: string = req.body.productName;
    let productPrice: number = req.body.productPrice;
    let userEmail: string = req.body.userEmail;

    let alreadyHaveOnCart = await Cart.findOne({
        where: {
            productName: productName,
            userKey: userEmail,
        }
    })

    if(alreadyHaveOnCart) {
        let addToCart = await Cart.increment(
            'productQuantity',
            {
                where: {
                    productName: productName,
                    userKey: userEmail,
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
            productQuantity: 1,
            productPrice: productPrice,
            userKey: userEmail,
        });
    
        if(addToCart) {
            res.json({result: true});
        } else {
            res.json({result: false});
        }
    }
}

export const incrementQuantity = async (req: Request, res: Response) => {
    let productName: string = req.body.productName;
    let productPrice: number = req.body.productPrice;
    let userEmail: string = req.body.userEmail;

    let incrementFromCart = await Cart.increment(
        'productQuantity',
        {
            where: {
                productName: productName,
                userKey: userEmail,
            }
        }
    )
}

export const decrementQuantity = async (req: Request, res: Response) => {
    let productName: string = req.body.productName;
    let productPrice: number = req.body.productPrice;
    let userEmail: string = req.body.userEmail;

    let decrementFromCart = await Cart.update({ 
            productQuantity: Sequelize.literal('productQuantity - 1') 
        }, 
        { where: { 
            productName: productName, userKey: userEmail
        } 
    });
}

export const getCartQuantity = async (req: Request, res: Response) => {
    let productName: string = req.body.productName;
    let userEmail: string = req.body.userEmail;

    let cartQuantity = await Cart.sum('productQuantity', {
        where: {
            userKey: 'teste@hotmail.com',
        }
    }).then(sum => {
        res.json({result: sum});
    });

}

export const getCartPrice = async (req: Request, res: Response) => {
    let productName: string = req.params.productName;
    let userEmail: string = req.params.userEmail;

    let getCartPrice = await Cart.findAll({ 
        attributes: [
            [Sequelize.literal('productPrice * productQantity'), 'test_field']
        ],
    });

    res.json({getCartPrice});

}

