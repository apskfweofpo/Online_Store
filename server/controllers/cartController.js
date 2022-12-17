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
            //console.log('Controller: ', email, deviceId);
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
            const {email, logId} = req.body
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
                        {cartId: cart.id, id: logId}
                }
            )
            return res.json(deletedDevice)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async deleteAll(req, res, next){
        try {
            const {email} = req.body
            //console.log("\n=================\nEmail: \n", email);
            const user = await User.findOne(
                {
                    where: {email},
                },
            )
            //console.log("\n=================\nUser: \n", user);
            const cart = await Cart.findOne(
                {
                    where: {userId: user.id},
                },
            )
            //console.log("\n=================\nCart: \n", cart);
            const deletedDevices = await CartDevice.destroy(
                {
                    where: {cartId: cart.id}
                }
            )

            return res.json(deletedDevices)
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
                {
                    where:
                        {cartId: cart.id}
                }
            )

            let idDevices = []

            allDevices.forEach(function (item, i, arr) {
                idDevices.push({id: item.id, deviceId: item.deviceId})
            })
            
           // console.log(idDevices) //     [{ id: 50, deviceId: 1 }, { id: 51, deviceId: 1 }, { id: 52, deviceId: 1 }]
           
            let infoDevices = []

            for (const idDevice of idDevices) {
                const content  = await  Device.findOne(
                    {
                        where: {id: idDevice.deviceId}
                    }
                )
                infoDevices.push({...content, logId: idDevice.id})
            }
            //console.log("------------------Devices from DB-----------------", infoDevices);
            return res.json(infoDevices)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }




}

module.exports = new cartController()