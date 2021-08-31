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


// Esta função é executada corretamente no REST test, porém no App em React-Native, ainda não consigo pegar todos os dados
export const uploadRecipe = async (req: Request, res: Response) => {        
    if(req.file) {
        let category: string = req.body.category;
        let type: string = req.body.type;
        let name: string = req.body.name;
        let description: string = req.body.description;
        let cookTime: number = req.body.cookTime;
        let ingQuantity: number = req.body.ingQuantity;
        let madeById: number = req.body.madeById;

        const filename = `${req.file.filename}.png`;
        await sharp(req.file.path)
            .resize(350, 350, {
                fit: 'fill'
            })
            .toFile(`./public/media/${filename}`);
    
        await unlink(req.file.path);

        let uploadRecipe = await Recipe.create({
            img: filename,
            category: category,
            type: type,
            name: name,
            description: description,
            cookTime: cookTime,
            ingQuantity: ingQuantity,
            madeById: 2
        });
        
        res.json({ result: 'Recipe upload successufuly'});
    } else {
        res.send({ error: 'This file is not compatible, please try uploading a .png file'});
    }
}


