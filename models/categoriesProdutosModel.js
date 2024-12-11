const connection = require("../config/database");
const CategoriesModel = require("./categoriesModel");
const ProductsModel = require("./productsModel");
const { DataTypes, Model } = require('sequelize')

class CategoriesProduct extends Model { }

CategoriesProduct.init(
    {
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ProductsModel,
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: CategoriesModel,
                key: 'id'
            },
            onDelete:'CASCADE'

        },

    },
    {
        sequelize: connection,
        tableName: 'category_product',
        timestamps: false,
        indexes:[
            {
                unique: true,
                fields: ['product_id', 'category_id']
            }
        ]

    }


)


module.exports = CategoriesProduct


