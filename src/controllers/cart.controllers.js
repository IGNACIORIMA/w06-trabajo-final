require('../models')
const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Category = require('../models/Category');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id
    const results = await Cart.findAll({
        where: { userId },
        include: [
            {
                model: Product,
                attributes: {exclude: ["createdAt", "updatedAt" ]},
                include: [
                    {
                        model: Category,
                        attributes: {exclude: ["createdAt", "updatedAt" ]}
                    }
                ]
            }
        ]
    });
    console.log(results)
    if (results[0]) {
        for (let i in results[0].dataValues) {
            delete results[0].dataValues.createdAt
            delete results[0].dataValues.updatedAt
        }
        return res.json(results);
    }
    return res.status(404).json({'message' : 'Empty Cart'})
});

const create = catchError(async(req, res) => {
    const userId = req.user.id
    const { productId, quantity } = req.body
    /* const kart = { productId, quantity, userId} */
    const result = await Cart.create({ productId, quantity, userId});
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Cart.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const userId = req.user.id
    const { id } = req.params;
    const result = await Cart.destroy({ where: {id, userId} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});


const update = catchError(async(req, res) => {
    const userId = req.user.id
    const { id } = req.params;
    const { quantity } = req.body
    const result = await Cart.update(
        { quantity },
        { where: {id, userId}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}