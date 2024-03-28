const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/',userController.getLogin)
router.post('/signup',userController.signup)
router.post('/login',userController.userLogin)
router.get('/home',userController.getHome)
module.exports = router