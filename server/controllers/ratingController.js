const { Type, Rating, Device } = require('../models/models')
const ApiError = require('../error/ApiError')

class RatingController {
    async create(req, res) {
        const { rate, userId, deviceId } = req.body
        const rating = await Rating.create({ rate, userId, deviceId })
        return res.json(rating)
    }


    async getAll(req, res) {
        const rates = await Rating.findAll()
        return res.json(rates)
    }
}

module.exports = new RatingController()