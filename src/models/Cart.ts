import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface Cart extends Model {
    id: number,
    productName: string,
    productQuantity: number,
    productPrice: number,
    userKey: string,
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
    userKey: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'cart',
    timestamps: false,
});