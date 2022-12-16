const Router = require('express')
const router = new Router()
const cartController = require('../controllers/cartController')


router.post('/add', cartController.addDevice)
router.delete('/delete', cartController.deleteDevice)
router.get ('/all', cartController.GetAll)

module.exports = router