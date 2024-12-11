const connection = require("./config/database")
const bcrypt = require('bcrypt')
const saltRounds = 10
const UsersModel = require("./models/usersModel")

require('./models/usersModel')
require('./models/categoriesModel')
require('./models/productsModel')
require('./models/productsImagesModel')
require('./models/productsOptionModel')
require('./models/categoriesProdutosModel')


async function syncDatabase() {
  try {
    await connection.sync({ alter: true }); 
    console.log('Banco de dados sincronizado.');

     const password = 'admin'; 
     const hashedPassword = await bcrypt.hash(password, saltRounds); 
     const user = { 
      firstname: 'Admin', 
      surname: 'User', 
      email: 'admin@admin.com', 
      password: hashedPassword }; 
      
      await UsersModel.create(user); 
      console.log('Usuário criado com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
}

syncDatabase();
