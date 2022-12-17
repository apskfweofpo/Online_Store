const uuid = require('uuid')
const path = require('path');
const {Order} = require('../models/models')
const ApiError = require('../error/ApiError');

class OrderController {
    async create(req, res, next) {
        try {

            const {name, telephone_number, address, type_Payment, amount_Payment, description} = req.body
            const order = await Order.create
            ({name, telephone_number, address, type_Payment, amount_Payment, description});
            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
}

module.exports = new OrderController()