const { DataTypes, Model } = require('sequelize')
const connection = require('../config/database')





class ProductsModel extends Model {
    static associate({ProductsImagesModel, ProductsOptionsModel, CategoriesModel, CategoriesProduct}) {
        ProductsModel.hasMany(ProductsImagesModel, { foreignKey: 'product_id' })
        ProductsModel.hasMany(ProductsOptionsModel, { foreignKey: 'product_id' })
        ProductsModel.belongsToMany(CategoriesModel,{
            through: CategoriesProduct,
            foreignKey:'product_id',
            otherKey:'category_id'
        })
    }
}

ProductsModel.init(
    {
        enable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false
        },
        use_in_menu: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        price_with_discount: {
            type: DataTypes.FLOAT,
            allowNull: false
        }

    },
    {
        sequelize: connection,
        tableName: "products",
        timestamps: true
    }

)

module.exports = ProductsModel