const uuid = require('uuid')
const path = require('path');
const {Cart, CartDevice} = require('../models/models.js')
const ApiError = require('../error/ApiError');
const {Brand, User, Device, DeviceInfo} = require("../models/models");
const bcrypt = require("bcrypt");
const {where} = require("sequelize");

class cartController {

    async addDevice(req, res, next) {
        try {
            const {email, deviceId} = req.body
            const user = await User.findOne(
                {
                    where: {email},
                },
            )
            const cart = await Cart.findOne(
                {
                    where: {userId: user.id},
                },
            )
            const addedDevice = await CartDevice.create({cartId: cart.id, deviceId})
            return res.json(addedDevice)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteDevice(req, res, next) {
        try {
            const {email, deviceId} = req.body
            const user = await User.findOne(
                {
                    where: {email},
                },
            )
            const cart = await Cart.findOne(
                {
                    where: {userId: user.id},
                },
            )
            const deletedDevice = await CartDevice.destroy(
                {where:
                        {cartId:cart.id, deviceId}
                }

             )
            return res.json(deletedDevice)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async GetAll(req, res, next) {
        try {
            const {email} = req.body
            const user = await User.findOne(
                {
                    where: {email},
                },
            )
            const cart = await Cart.findOne(
                {
                    where: {userId: user.id},
                },
            )
            const allDevices = await CartDevice.findAll(
                {where:
                        {cartId:cart.id}
                }

            )
            return  res.json(allDevices)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new cartController()