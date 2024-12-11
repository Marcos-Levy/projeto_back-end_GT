const CategoriesModel = require("../models/categoriesModel");


class CategoriesController {

    async listar(req, res) {
        let { limit = 12, page = 1, fields, use_in_menu } = req.query
        limit = parseInt(limit)
        page = parseInt(page)
        // const limit = query.limit ? parseInt(query.limit) : query.limit = 12
        // const fields = query.fields ? query.fields.split(',') : ['id', 'name', 'slug', 'use_in_menu']

        const queryOptions = {
            attributes: fields ? fields.split(',') : undefined,
            where: {},
            limit: limit === -1 ? undefined : limit,
            offset: limit === -1 ? undefined : (page - 1) * limit,
        };

        if (use_in_menu) {
            queryOptions.where.use_in_menu = use_in_menu === 'true';
        }
        
        try {

            const { rows: data, count: total } = await CategoriesModel.findAndCountAll(queryOptions)
            return res.status(200).json({
                data,
                total,
                limit,
                page
            })

        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }

    async listarID(req, res) {
        try {
            const id = req.params.id
            const dados = await CategoriesModel.findByPk(id)
            return res.status(200).json(dados)
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }

    async criar(req, res) {
        try {
            const body = req.body
            await CategoriesModel.create(body)
            return res.status(201).json({
                messagem: "Categoria criada com sucesso!"
            })

        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }

    async deletar(req, res) {
        try {
            const id = req.params.id
            await CategoriesModel.destroy({ where: { id } })
            return res.status(204).end()


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
            await CategoriesModel.update(body, { where: { id } })
            return res.status(204).end()
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }

}


module.exports = CategoriesController






