import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

type Product = {
    id: number,
    name: string,
    quantity: number,
    quantityType: string,
    expireAt: string,
};

export interface RefrigeratorType extends Model {
    id: number,
    userId: number,
    product: Product[],
};
    
export const Refrigerator = sequelize.define<RefrigeratorType>("Refrigerator", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    userId: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'refrigerators',
    timestamps: false,
});