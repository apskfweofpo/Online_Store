const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "Options") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        if (!token) {
            res.status(401).json({ message: "Не авторизован" })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        console.log(e)
        res.status(401).json({ message: "Error 401" })
    }
}