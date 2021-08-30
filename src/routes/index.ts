import { Request, Response, Router } from 'express';
import multer from 'multer';

import * as userController from '../controllers/userController';
import * as recipeController from '../controllers/recipeController';

const upload = multer({
    dest: './tmp',
    fileFilter: (req, file, cb) => {
        const allowed: string[] = ['image/png', 'image/jpg', 'image/jpeg'];
        cb(null, allowed.includes(file.mimetype));      // Como o resultado volta TRUE ou FALSE, não tem problema colocar o includes direto 
    },
});

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    res.json({pong: true})
})

router.get('/', userController.getUsers);
router.post('/create-user', userController.createUser);

router.get('/recipes', recipeController.getRecipes);
router.get('/recipe/:slug', recipeController.getOneRecipe);
router.post('/upload-recipe', recipeController.uploadRecipe);
router.post('/upload-recipe-image/:slug', upload.single('img'), recipeController.uploadRecipeImage);

export default router;