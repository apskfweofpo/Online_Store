const uuid = require('uuid')
const path = require('path');
const {Order} = require('../models/models')
const ApiError = require('../error/ApiError');
const OrderValidator = require('../tests/Validators/orderValidator')

const orderValidator = new OrderValidator()

class OrderController {
    async create(req, res, next) {
        try {

            const {name, telephone_number, address, type_Payment, amount_Payment, description} = req.body
            console.log("PARAMS\n\n", {name, telephone_number, address, type_Payment, amount_Payment, description});


            if(orderValidator.validateOrderParams({name, telephone_number, address, type_Payment, amount_Payment, description})){
                const order = await Order.create({name, telephone_number, address, type_Payment, amount_Payment, description});
                return res.status(200).json(order)
            }else{
                return res.status(500).json({message: "Error: Bad order params"})
            }
            
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
}

module.exports = new OrderController()