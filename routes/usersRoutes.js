const authMiddleware = require ('../middleware/authMiddleware')
let UsersController = require('../controllers/usersController')
UsersController = new  UsersController()

const express = require('express');
const router = express.Router();


router.get('/', UsersController.listar);
router.get('/:id', UsersController.listarID);

router.use(authMiddleware)

router.post('/', UsersController.criar);
router.put('/:id', UsersController.atualizar);
router.delete('/:id', UsersController.deletar);

module.exports = router;