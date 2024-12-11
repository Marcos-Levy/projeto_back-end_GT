const jwt = require('jsonwebtoken')
const UsersModel = require('../models/usersModel')
const bcrypt = require('bcrypt')
require('dotenv').config();


async function login(req, res) {
    try {
        const { email, password } = req.body;
        const usuario = await UsersModel.findOne({
            where: {
                email: email,
            }

        })
        
        const isUsuario = (usuario === null || usuario === undefined || usuario ==='') ? false : true
        const isPassword = isUsuario ? await bcrypt.compare(password, usuario.password) : false
        
        if (isUsuario && isPassword) {

            const dataToken = {
                id: usuario.id,
                email: usuario.email,
                username: usuario.firstname,
                exp: Math.floor(Date.now() / 1000) + (60 * 60) // + 3600 segundos  // EXPIRA EM 1 HORA
            }

            const token = jwt.sign(dataToken, process.env.TOKEN_AUTH);

            return res.status(201).json({
                data: {
                    id: usuario.id,
                    fistname: usuario.firstname,
                    surname: usuario.surname,
                    email: usuario.email
                },
                token: token
            })
        }
        else {
            return res.json({
                messagem: 'Usuário não encontrado, verifique o email e a senha!'
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })

    }



};


module.exports = { login }; 