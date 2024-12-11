const {DataTypes, Model } = require('sequelize');
const connection = require('../config/database')
const ProductsModel = require('./productsModel')

class ProductsOptionsModel extends Model{}

ProductsOptionsModel.init(
    {   
        product_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:ProductsModel,
                key:'id'
            },
            onDelete:'CASCADE'
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        shape:{
            type:DataTypes.ENUM({
                values: ['square', 'circle']
            }),
            allowNull:true,
            defaultValue:'square'
        },
        radius:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:0
        },
        type:{
            type:DataTypes.ENUM({
                values: ['text', 'color']
            }),
            allowNull:true,
            defaultValue:'text'
        },
        values:{
            type:DataTypes.JSON,
            allowNull:false,
            
        }
      
    },
    {
        sequelize:connection,
        tableName:'options',
        modelName:'options',
        timestamps:false

    }
)


module.exports=ProductsOptionsModel

