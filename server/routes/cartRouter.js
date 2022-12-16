const Router = require('express')
const router = new Router()
const cartController = require('../controllers/cartController')


router.post('/add', cartController.addDevice)
router.post('/delete', cartController.deleteDevice)
router.post ('/all', cartController.GetAll)

module.exports = router