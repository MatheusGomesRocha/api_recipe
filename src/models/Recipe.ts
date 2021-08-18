import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface RecipeType extends Model {
    id: number,
    category: string,
    name: string,
    description: string,
    cookTime: number,
    ingQuantity: number,
}

export const Recipe = sequelize.define<RecipeType>("Recipe", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    category: {
        type: DataTypes.STRING,

        get() {
            const categoryUppercase = this.getDataValue('category').toUppercase;
            return categoryUppercase;
        }
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    cookTime: {
        type: DataTypes.INTEGER,
    },
    ingQuantity: {
        type: DataTypes.INTEGER,
    },
})