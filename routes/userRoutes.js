const express = require('express');
const router = express.Router()
const multer = require('multer');
const userController = require('../controllers/userController')
const usermiddleware = require('../middlewares/userauth')
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../public/images"));
    },
    filename: (req, file, cb) => {
      const name = Date.now() + "-" + file.originalname;
      cb(null, name);
    },
  });
  
  const upload = multer({ storage: storage });

router.get('/login',usermiddleware.redirectHome,userController.getLogin)
router.post('/signup',userController.signup)
router.post('/login',userController.userLogin)
router.get('/',usermiddleware.auth,userController.getHome)
router.get('/logout',userController.userLogout)
router.post('/userupload',upload.single('image'),userController.userDataUpload)
module.exports = router