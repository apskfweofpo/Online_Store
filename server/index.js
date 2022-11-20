require('dotenv').config()
const express = require('express')
const sequelize = require('./db') //импорт нашего объекта для подлкючения бд
const fileUpload = require('express-fileupload')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

//Обработка ошибок
app.use(errorHandler)

app.get('/', (req, res) => {
    res.status(200).json({ message: "!!" })
})


const start = async () => {
    try {
        await sequelize.authenticate() // ф-ция для подключения бд
        await sequelize.sync() // ф-ция для сверения бд со схемами данных
        app.listen(PORT, () => console.log(`SERVER STArt: ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}

start()



