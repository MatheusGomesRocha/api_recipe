import { Request, Response, Router } from 'express';
import multer, { diskStorage } from 'multer';

import * as userController from '../controllers/userController';
import * as recipeController from '../controllers/recipeController';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './tmp');
    },
    filename: (req, file, cb) => {
        let randomName = Math.floor(Math.random() * 999999999)
        cb(null, `${randomName+Date.now()}.png`);
    },
});

const upload = multer({
    storage
});

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    res.json({pong: true})
})

router.get('/', userController.getUsers);
router.post('/create-user', userController.createUser);

router.get('/recipes', recipeController.getRecipes);
router.get('/recipe/:slug', recipeController.getOneRecipe);
router.post('/upload-recipe', upload.single('img'), recipeController.uploadRecipe);

export default router;