const express = require('express')
const authController = require('../controllers/authControllers')
const jwt = require('../middleware/jwt')
const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.put('/forgotPassword', authController.forgotPassword)
router.post('/logout', authController.logout)
router.delete('/deleteUser', jwt, authController.deleteUser)

module.exports = router