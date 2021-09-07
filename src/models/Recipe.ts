import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

type subIng = {
    id: number,
    name: string,
}
export interface RecipeType extends Model {
    id: number,
    img: string,
    category: string,
    type: string,
    name: string,
    description: string,
    cookTime: number,
    ingQuantity: number,
    madeById: number,
}

export const Recipe = sequelize.define<RecipeType>("Recipe", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    img: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING,

        get() {
            const raw = this.getDataValue('category');
            const rawCapitalze = raw.charAt(0).toUpperCase() + raw.slice(1);

            return rawCapitalze;
        }
    },
    type: {
        type: DataTypes.STRING,
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
        type: DataTypes.NUMBER,
    },
    madeById: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'recipes',
    timestamps: false,
});