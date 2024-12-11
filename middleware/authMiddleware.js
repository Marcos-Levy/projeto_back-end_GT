const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.headers.token;
    
    if (!token) {
        return res.status(400).json({ mensagem: 'Token não fornecido' });
    }
    try{
        const decoded = jwt.verify(token, process.env.TOKEN_AUTH);
        req.usuarioId = decoded.id;
        next(); 
    }catch (err) {
        res.status(403).json({ mensagem: 'Token inválido' });
    }

    
}

module.exports = authMiddleware;