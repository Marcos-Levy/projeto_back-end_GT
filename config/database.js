const {Sequelize} = require('sequelize')

const bd = 'geracaotech' // nome do banco de dados
const user = 'root' // nome do usuário do MySQL
const password = 'root' //senha do usuário do Mysql

const connection = new Sequelize(bd, user, password, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });

module.exports = connection;