import { Request, Response } from 'express';
import { Favorite } from '../models/Favorite';
import { Recipe } from '../models/Recipe';

export const isRecipeFavorited = async (req: Request, res: Response) => {
    let token = req.params.token;
    let recipeId = req.params.recipeId;

    let hasFavorited = await Favorite.findOne({
        where: {
            userId: token,
            recipeId: recipeId
        }
    });

    if(hasFavorited) {
        res.json({result: true});
    } else {
        res.json({error: 'Recipe not favorited'});
    }
}


export const addToFavorites = async (req: Request, res: Response) => {
    let token = req.body.token;
    let recipeId = req.body.recipeId;

    let hasFavorited = await Favorite.findOne({
        where: {
            userId: token,
            recipeId: recipeId
        }
    });

    if(hasFavorited) {
        res.json({error: 'Recipe already favorited'});
    } else {
        let addFavorite = await Favorite.create({
            userId: token,
            recipeId: recipeId,
        });
    
        if(addFavorite) {
            res.json({result: true});
        } else {
            res.json({error: 'Something wrent wrong'})
        }
    }
};

export const getUserFavorites = async (req: Request, res: Response) => {
    let token = req.params.token;

    let favorites = await Favorite.findAll({
        include: Recipe
    });

    res.json({result: favorites});
}