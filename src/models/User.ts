import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface UserType extends Model {
    id: number,
    name: string,
    email: string,
    // user: string,
    password: string,
}
    
export const User = sequelize.define<UserType>("User", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    // user: {
    //     type: DataTypes.STRING
    // },
    password: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'users',
    timestamps: false,
});