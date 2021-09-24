import { Request, Response, Router } from 'express';
import multer from 'multer';

import * as userController from '../controllers/userController';
import * as recipeController from '../controllers/recipeController';
import * as refrigeratorController from '../controllers/refrigeratorController';
import * as favoriteController from '../controllers/favoriteController';
import * as Auth from '../middlewares/auth';

const upload = multer({
    dest: './tmp',
    fileFilter: (req, file, cb) => {
        const allowed: string = 'image/png';
        cb(null, allowed.includes(file.mimetype));      // Como o resultado volta TRUE ou FALSE, não tem problema colocar o includes direto 
    },
});

const uploadImage = multer({
    dest: './tmp',
    fileFilter: (req, file, cb) => {
        const allowed = ['image/jpg', 'image/jpeg', 'image/png'];
        cb(null, allowed.includes(file.mimetype));      // Como o resultado volta TRUE ou FALSE, não tem problema colocar o includes direto 
    },
});



const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    res.json({pong: true})
})

router.get('/', userController.getUsers);
router.get('/has-user/:email', userController.hasUser);
router.post('/send-verification-code', userController.sendVerificationCode);
router.post('/create-user', userController.createUser);
router.post('/login', userController.login);
router.get('/user/:token', userController.getUserLoggedIn);
router.post('/edit-profile/:token', uploadImage.single('img'), userController.editProfile);

router.get('/recipes/:filter/:type', recipeController.getRecipes);
router.get('/searching-recipes/:search', recipeController.getRecipesSearched);
router.get('/recipe/:slug', recipeController.getOneRecipe);
router.post('/upload-recipe/:token', upload.single('img'), recipeController.uploadRecipe);
router.get('/user-recipes/:token', recipeController.getUserRecipes);
router.post('/delete-recipe/:token', recipeController.deleteRecipe);

router.get('/refrigerator/:token', refrigeratorController.getUserRefrigerator);
router.post('/insert-refrigerator/:token', uploadImage.single('img'), refrigeratorController.addFoodInRefrigerator);
router.post('/delete-food/:token', refrigeratorController.deleteFoodFromRefrigerator);

router.get('/recipe-favorite/:token/:recipeId', favoriteController.isRecipeFavorited);
router.post('/add-favorites/:token', favoriteController.addToFavorites);
router.get('/favorites/:token', favoriteController.getUserFavorites);

export default router;