const {DataTypes, Model } = require('sequelize');
const connection = require('../config/database')
const ProductsModel = require('./productsModel')

class ProductsImagesModel extends Model{
   
}

ProductsImagesModel.init(
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
        enable:{
            type:DataTypes.BOOLEAN,
            allowNull:true,
            defaultValue:0
        },
        path:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        sequelize:connection,
        tableName:'images',
        modelName:'images',
        timestamps:false

    }
)


module.exports=ProductsImagesModel

