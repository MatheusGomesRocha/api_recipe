import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface RefrigeratorType extends Model {
    id: number,
    userId: number,
    img: string,
    name: string,
    quantity: number,
    quantityType: string,
    addedAt: string,
    expireAt: string,
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
    img: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    quantity: {
        type: DataTypes.STRING
    },
    quantityType: {
        type: DataTypes.NUMBER
    },
    addedAt: {
        type: DataTypes.STRING
    },
    expireAt: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'refrigerators',
    timestamps: false,
});