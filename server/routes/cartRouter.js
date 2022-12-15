const Router = require('express')
const router = new Router()
const cartController = require('../controllers/cartController')

router.post('/', cartController.create)
router.get('/', cartController.getAll)
router.delete('/:id', cartController.deleteOne)

module.exports = router