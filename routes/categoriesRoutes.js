const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/categoriesController')
categoriesController = new CategoriesController()




router.get('/', categoriesController.listar);
router.get('/:id', categoriesController.listarID);
router.post('/', categoriesController.criar);
router.put('/:id', categoriesController.atualizar);
router.delete('/:id', categoriesController.deletar);

module.exports = router;