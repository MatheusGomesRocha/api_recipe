import { Request, Response, Router } from 'express';
import * as userController from '../controllers/userController';
import * as recipeController from '../controllers/recipeController';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    res.json({pong: true})
})

router.get('/', userController.getUsers);
router.post('/create-user', userController.createUser);

router.get('/recipes', recipeController.getRecipes);
router.get('/recipe/:slug', recipeController.getOneRecipe);

export default router;