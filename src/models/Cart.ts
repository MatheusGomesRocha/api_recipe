import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface Cart extends Model {
    id: number,
    productName: string,
    productQuantity: number,
    productPrice: number,
    userId: number,
}
    
export const Cart = sequelize.define<Cart>("Cart", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    productName: {
        type: DataTypes.STRING
    },
    productQuantity: {
        type: DataTypes.INTEGER
    },
    productPrice: {
        type: DataTypes.INTEGER
    },
    userId: {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'cart',
    timestamps: false,
});