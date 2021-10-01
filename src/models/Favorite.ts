import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Recipe } from './Recipe';

export interface FavoriteType extends Model {
    id: number,
    userId: number,
    RecipeId: number,
};
    
export const Favorite = sequelize.define<FavoriteType>("Favorite", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    userId: {
        type: DataTypes.INTEGER,
    },
    recipeId: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'favorites',
    timestamps: false,
});

Recipe.hasMany(Favorite);
Favorite.belongsTo(Recipe);