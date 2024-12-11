const connection = require("./config/database")

require('./models/usersModel')
require('./models/categoriesModel')
require('./models/productsModel')
require('./models/productsImagesModel')
require('./models/productsOptionModel')
require('./models/categoriesProdutosModel')


async function syncDatabase() {
    try {
      await connection.sync({ alter: true }); //{ alter: true }; // Altera a tabela sem perder dados
      console.log('Banco de dados sincronizado.');
    } catch (error) {
      console.error('Erro ao sincronizar o banco de dados:', error);
    }
  }
  
  syncDatabase();