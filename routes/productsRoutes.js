const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/productController')
productsController = new ProductsController()




router.get('/', productsController.listar);
router.get('/:id', productsController.listarID);

router.post('/', productsController.criar);
router.put('/:id', productsController.atualizar);
router.delete('/:id', productsController.deletar);

module.exports = router;