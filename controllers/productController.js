const ProductsModel = require('../models/productsModel')
const ProductsImagesModel = require('../models/productsImagesModel')
const ProductsOptionsModel = require('../models/productsOptionModel')
const CategoriesModel = require('../models/categoriesModel')
const CategoriesProduct = require('../models/categoriesProdutosModel')
const { Op } = require('sequelize')
const connection = require('../config/database')



class ProductsController {
    constructor() {
        ProductsModel.associate({
            ProductsImagesModel,
            ProductsOptionsModel,
            CategoriesModel,
            CategoriesProduct
        })
    }

    async listar(req, res) {
        let {
            limit = 12,
            page = 1,
            fields,
            match,
            category_ids,
            price_range,
            option

        } = req.query

        limit = parseInt(limit)
        page = parseInt(page)

        const optionsQuery = option ? {
            where: connection.where(
                connection.fn(
                    'JSON_CONTAINS',
                    connection.col('values'),
                    JSON.stringify(option.split(','))
                ),
                true
            ),
        } : undefined;

        const queryOptions = {
            attributes: fields ? fields.split(',') : undefined,
            where: {},
            limit: limit === -1 ? undefined : limit,
            offset: limit === -1 ? undefined : (page - 1) * limit,
            include: [
                {
                    model: CategoriesModel,
                    where: category_ids ? { id: { [Op.in]: category_ids.split(',').map(Number) } } : undefined
                },
                {
                    model: ProductsImagesModel
                },
                {
                    model: ProductsOptionsModel,
                    ...optionsQuery

                }

            ]

}

        if (match) {
            queryOptions.where[Op.or] =
                [
                    { name: { [Op.like]: `%${match}%` } },
                    { description: { [Op.like]: `%${match}%` } }
                ]

        }

        if (price_range) {
            const [minPrice, maxPrice] = price_range.split("-").map(Number);
            queryOptions.where.price = {
                [Op.between]: [minPrice, maxPrice],
            };
        }

        try {

            const data = await ProductsModel.findAll(queryOptions)
            const total = await ProductsModel.count()

            return res.status(200).json({
                data,
                total,
                limit,
                page
            })
        }
        catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }

    }

    async listarID(req, res) {
        try {
            const id = req.params.id
            const dados = await ProductsModel.findAll({
                where: {
                    id: id
                },
                include: [
                    {
                        model: CategoriesModel,
                    },
                    {
                        model: ProductsImagesModel
                    },
                    {
                        model: ProductsOptionsModel
                    }
                ],
                order: [[CategoriesModel, 'id', 'ASC']]
            })
            return res.status(200).json(dados)
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }

    async criar(req, res) {
        try {
            const { categories, ...body } = req.body

            let product = await ProductsModel.create(body, {
                include: [
                    {
                        through: CategoriesProduct,
                        model: CategoriesModel
                    },
                    { model: ProductsImagesModel },
                    { model: ProductsOptionsModel }
                ]
            })
            await product.setCategories(categories)

            return res.status(201).json({
                messagem: "Produtos adicionado com sucesso!"
            })

        } catch (error) {
            return res.status(500).json({
                error: error.message
            })

        }
    }

    async atualizar(req, res) {
        try {

            const id = req.params.id
            const { enable, name, slug, use_in_menu, stock, description, price, price_with_discount, Categories, images, options } = req.body

            const products = await ProductsModel.findByPk(id)

            if (!products) { return res.status(400).json({ error: 'Produto não encontrado' }); }

            enable ? products.enable = enable : undefined
            name ? products.name = name : undefined
            slug ? products.slug = slug : undefined
            use_in_menu ? products.use_in_menu = use_in_menu : undefined
            stock ? products.stock = stock : undefined
            description ? products.description = description : undefined
            price ? products.price = price : undefined
            price_with_discount ? products.price_with_discount = price_with_discount : undefined
            await products.save()

            if (images && Array.isArray(images)) {
                for (const img of images) {
                    if (img.deleted === true) {
                        await ProductsImagesModel.destroy({ where: { id: img.id } })
                    }
                    else if (img.id) {
                        await ProductsImagesModel.update({ path: img.path }, { where: { id: img.id } })
                    }
                    else {
                        await ProductsImagesModel.create({ path: img.path, product_id: id })
                    }

                }
            }
            if (options && Array.isArray(options)) {
                for (const opt of options) {
                    if (opt.deleted === true) {
                        await ProductsOptionsModel.destroy({ where: { id: opt.id } })
                    }
                    else if (opt.id) {
                        await ProductsOptionsModel.update({
                            title: opt.title,
                            shape: opt.shape,
                            radius: opt.radius,
                            type: opt.type,
                            values: opt.values
                        },
                            {
                                where: { id: opt.id }
                            })
                    }
                    else {
                        await ProductsOptionsModel.create({
                            product_id: id,
                            title: opt.title,
                            shape: opt.shape,
                            radius: opt.radius,
                            type: opt.type,
                            values: opt.values
                        })
                    }

                }
            }

            if (Categories && Array.isArray(Categories)) {
                for (const cat of Categories) {
                    if (cat.deleted === true) {
                        await CategoriesProduct.destroy({ where: { category_id: cat.id } })
                    }
                    else {
                        await CategoriesProduct.create({
                            product_id: id,
                            category_id: cat.category_id
                        })
                    }

                }
            }

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
            await ProductsModel.destroy({
                where: { id }
            })
            return res.status(204).end()

        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }




}

module.exports = ProductsController