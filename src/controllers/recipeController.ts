import { unlink } from 'fs/promises';
import { Request, Response } from 'express';
import sharp from 'sharp';
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
    let category: string = req.body.category;
    let type: string = req.body.type;
    let name: string = req.body.name;
    let description: string = req.body.description;
    let cookTime: number = req.body.cookTime;
    let ingQuantity: number = req.body.ingQuantity;
    let madeById: number = req.body.madeById;

    if(req.file) {
        const filename = `${req.file.filename}.png`;

        await sharp(req.file.path)
            .resize(200, 200)
            .toFile(`./public/media/${filename}`);

        await unlink(req.file.path);
        
        let uploadRecipe = await Recipe.create({
            img: filename,
            category,
            type,
            name,
            description,
            cookTime,
            ingQuantity,
            madeById
        });

        res.json({ result: 'Recipe upload successufuly'});
    } else {
        res.status(400);    // Bad Response
        res.json({ error: 'Arquivo inválido'});
    }


}