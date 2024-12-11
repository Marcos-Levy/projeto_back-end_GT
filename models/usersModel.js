const { DataTypes, Model } = require('sequelize')
const connection = require('../config/database')


class UsersModel extends Model { 
  }

UsersModel.init({
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
{
    sequelize:connection,
    tableName:'Users',
    timestamps:true

})

module.exports = UsersModel