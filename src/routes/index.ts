import { Request, Response, Router } from 'express';
import multer from 'multer';

import * as userController from '../controllers/userController';
import * as recipeController from '../controllers/recipeController';
import * as Auth from '../middlewares/auth';

const upload = multer({
    dest: './tmp',
    fileFilter: (req, file, cb) => {
        const allowed: string = 'image/png';
        cb(null, allowed.includes(file.mimetype));      // Como o resultado volta TRUE ou FALSE, não tem problema colocar o includes direto 
    },
});

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    res.json({pong: true})
})

router.get('/', userController.getUsers);
router.post('/create-user', userController.createUser);

router.get('/recipes/', recipeController.getRecipes);
router.get('/recipe/:slug', recipeController.getOneRecipe);

router.post('/upload-recipe/:token',  Auth.auth, upload.single('img'), recipeController.uploadRecipe);

export default router;