import { Request, Response } from 'express';
import { Recipe } from '../models/Recipe';

export const getRecipes = async (req: Request, res: Response) => {
    const recipes = await Recipe.findAll();
    res.json({recipes});
}

export const getOneRecipe = async (req: Request, res: Response) => {
    let slug: string = req.params.slug;

    const recipe = await Recipe.findOne({
        where: {
            id: slug
        }
    });

    res.json({recipe});
}

export const uploadRecipe = async (req: Request, res: Response) => {
    let img = req.file?.filename;
    let category: string = req.body.category;
    let type: string = req.body.type;
    let name: string = req.body.name;
    let description: string = req.body.description;
    let cookTime: number = req.body.cookTime;
    let ingQuantity: number = req.body.ingQuantity;

    if(img) {
        res.json({img, category, type, name, description, cookTime, ingQuantity});
    } else {
        res.json({ error: 'Tipo de imagem suporte é .png'});
    }


}