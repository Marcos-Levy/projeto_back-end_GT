const express = require('express');
const app = express();
const RotasPrivadas = require('./routes/privateRoutes');
const RotasPublicas = require('./routes/publicRoutes')


app.use(express.json());
app.use('/api', RotasPublicas);
app.use('/api', RotasPrivadas);

app.get('/teste/:id', (req, res) => {
    const query = req.query

    const id = req.params.id

    res.send(
        "Query: " + query.name + " | " + query.sobrenome + "<br>" +
        "Params: " + id
    )
})

const PORT = 3000;
const HOST = "localhost"
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: http://${HOST}:${PORT}`);
});