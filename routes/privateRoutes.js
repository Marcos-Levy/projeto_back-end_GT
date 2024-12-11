const express = require('express')
const RotasPrivadas = express.Router();
const usersRoutes = require('./usersRoutes')
const productsRoutes = require('./productsRoutes')
const categoriesRoutes = require('./categoriesRoutes')


const authMiddleware = require('../middleware/authMiddleware');

//Middleware



RotasPrivadas.use('/users', usersRoutes)
RotasPrivadas.use(authMiddleware)
RotasPrivadas.use('/products', productsRoutes)
RotasPrivadas.use('/categories', categoriesRoutes)



module.exports = RotasPrivadas