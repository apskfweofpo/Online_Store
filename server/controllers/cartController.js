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
            console.log('Controller: ', email, deviceId);
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
                {
                    where:
                        {cartId: cart.id, deviceId}
                }
            )
            return res.json(deletedDevice)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async GetAll(req, res, next) {
        try {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
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
                {
                    where:
                        {cartId: cart.id}
                }
            )

            let idDevices = []

            allDevices.forEach(function (item, i, arr) {
                console.log(i + ": " + item.deviceId)
                idDevices.push(item.deviceId)
            })
            console.log(idDevices)
            let infoDevices = []



            /*await idDevices.forEach( function (item, i, arr) {
                console.log(i + ": " + item)
                const dev = await this.finddev(item)
                infoDevices.push(dev)
                console.log(infoDevices)
            })*/
            for (const idDevice of idDevices) {
                const content  = await  Device.findOne(
                    {
                        where: {id: idDevice}
                    }
                )
                infoDevices.push(content)
                console.log(infoDevices);
            }

            return res.json(infoDevices)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }




}

module.exports = new cartController()