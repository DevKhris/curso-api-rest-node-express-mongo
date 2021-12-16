const express = require('express')
const router = express.Router()

const contactController = require('../controllers/contactController')

router.get('/', contactController.index)

router.get('/:contactId', contactController.show)

router.post('/', contactController.store)

router.put('/:contactId', contactController.update)

router.delete('/:contactId', contactController.destroy)

module.exports = router