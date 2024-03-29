const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController')
const usermiddleware = require('../middlewares/userauth')

router.get('/login',usermiddleware.redirectHome,userController.getLogin)
router.post('/signup',userController.signup)
router.post('/login',userController.userLogin)
router.get('/',usermiddleware.auth,userController.getHome)
module.exports = router