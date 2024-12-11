const {DataTypes, Model} = require('sequelize')
const connection = require('../config/database')

class CategoriesModel extends Model{}

CategoriesModel.init({
  name:{
    type:DataTypes.STRING,
    allowNull:false
  },
  slug:{
    type:DataTypes.STRING,
    allowNull:false
  },
  use_in_menu:{
    type:DataTypes.BOOLEAN,
    defaultValue:false,
    allowNull:true
  }

},
{
  sequelize:connection,
  tableName:'category',
  modelName:'Categories',
  timestamps:true
}
)

module.exports = CategoriesModel