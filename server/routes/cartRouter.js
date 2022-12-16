const Router = require('express')
const router = new Router()
const cartController = require('../controllers/cartController')


router.post('/add', cartController.addDevice)
router.post('/delete', cartController.deleteDevice)
router.post ('/all', cartController.GetAll)
router.post ('/deleteAll', cartController.deleteAll)
module.exports = router