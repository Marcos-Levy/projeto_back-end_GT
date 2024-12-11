const UsersModel = require('../models/usersModel')
const bcrypt = require('bcrypt')
const saltRounds = 10;

class UsersController {
    async listar(req, res) {
        try {
            let query = req.query
            const fields = query.fields ? query.fields.split(',') : ['id', 'firstname', 'surname', 'email']
            const attributes = fields.length > 0 ? fields.filter(item => item !== 'password') : { exclude: ['password'] }
            const dados = await UsersModel.findAll(
                {
                    attributes: attributes,
                }
            );

            return res.status(200).json(dados);

        } catch (error) {
            return res.status(500).json({
                error: error.message
            })

        }

    }

    async criar(req, res) {
        try {
            const {password, confirmPassword, ...body} =  req.body
            
            if(password === confirmPassword){

                bcrypt.genSalt(saltRounds, await function(err, salt) {
                    if(err){
                        return res.status(500).json({
                            messagem : 'Erro ao gerar salt para hashear!'
                        })
                    }
                    bcrypt.hash(password, salt, async function(err, hash) {
                        if(err){
                            return res.status(500).json({
                                messagem: 'Erro ao hashear password!'
                            })
                        
                        }
                        
                        const user = {...body, password: hash}
                        await UsersModel.create(user)
                        return res.status(201).json({
                            message: "Usuário criado com sucesso!"
                        })
                    });
                });


            }else{
                return res.status(400).json({
                    messagem : "As senhas não coincidem!"
                })
            }
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }

    async listarID(req, res) {
        try {
            const id = req.params.id
            const dados = await UsersModel.findAll({
                where: {
                    id: id
                },
                attributes: ['id', 'firstname', 'surname', 'email']
            })
            return res.status(200).json(dados)
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }

    async atualizar(req, res) {
        try {

            const id = req.params.id
            const body = req.body

            await UsersModel.update(body, {
                where: {
                    id: id
                }
            })
            return res.status(204).end()
        }
        catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }

    async deletar(req, res) {
        try {

            const id = req.params.id

            await UsersModel.destroy({
                where: {
                    id: id
                }
            })
            return res.status(204).end()
        }
        catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }

}
module.exports = UsersController