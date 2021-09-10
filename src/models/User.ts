import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
const bcrypt = require('bcrypt');
export interface UserType extends Model {
    id: number,
    avatar: string,
    name: string,
    email: string,
    user: string,
    password: string,
}
    
export const User = sequelize.define<UserType>("User", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    avatar: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING,

        get() {
            const raw = this.getDataValue('name');
            const rawCapitalze = raw.charAt(0).toUpperCase() + raw.slice(1);
            
            return rawCapitalze;
        }
    },
    email: {
        type: DataTypes.STRING
    },
    user: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,

        set(value) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue('password', hash);
        }
    }
}, {
    tableName: 'users',
    timestamps: false,
});