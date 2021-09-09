import { unlink } from 'fs/promises';
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import sharp from 'sharp';
import { Recipe } from '../models/Recipe';

export const getRecipes = async (req: Request, res: Response) => {
    let filter = req.query.v;

    if(filter === 'All') {
        const recipes = await Recipe.findAll();

        res.json({recipes});
    } else {
        const recipes = await Recipe.findAll({
            where: {
                category: filter
            }
        });

        res.json({recipes});
    }

}

export const getRecipesSearched = async (req: Request, res: Response)  => {
    let search = req.query.v;

    if(search == '') {
        res.json({recipes: []})
    } else {
        const recipes = await Recipe.findAll({
            where: {
                name: {
                    [Op.like]: `${search}%`
                }
            }
        })
        
        res.json({recipes});
    }
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
    if(req.file) {
        let category: string = req.body.category;
        let type: string = req.body.type;
        let name: string = req.body.name;
        let description: string = req.body.description;
        let cookTime: number = req.body.cookTime;
        let ingQuantity: string[] = req.body.ingQuantity;
        let madeById: number = req.body.madeById;

        // res.json({ingQuantity});

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
            ingQuantity: 5,
            madeById: madeById
        });
        
        if(uploadRecipe) {
            res.json({ result: 'Recipe upload successufuly'});
        } else {
            res.json({error: 'Something wrent wrong'});
        }
    } else {
        res.send({ error: 'This file is not compatible, please try uploading a .png file'});
    }
}


