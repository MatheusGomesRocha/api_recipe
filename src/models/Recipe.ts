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
            const raw = this.getDataValue('category');
            const rawCapitalze = raw.charAt(0).toUpperCase() + raw.slice(1);

            return rawCapitalze;
        }
    },
    name: {
        type: DataTypes.STRING,

        get() {
            const raw = this.getDataValue('name');
            const rawCapitalze = raw.charAt(0).toUpperCase() + raw.slice(1);

            return rawCapitalze;
        }
    },
    description: {
        type: DataTypes.STRING,

        get() {
            const raw = this.getDataValue('description');
            const rawCapitalze = raw.charAt(0).toUpperCase() + raw.slice(1);

            return rawCapitalze;
        }
    },
    cookTime: {
        type: DataTypes.INTEGER,
    },
    ingQuantity: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'recipes',
    timestamps: false,
});