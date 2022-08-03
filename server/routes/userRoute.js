const express = require('express')
const { register } = require('../controllers/userController')
const { login } = require('../controllers/userController')
const { getUserInfo } = require('../controllers/userController')
const { authMiddleware } = require('../middlewares/authMiddlewares')
const { body } = require('express-validator');
const multer = require("multer")

const storage = multer.diskStorage({
    destination:(req,file,cb)=>
    {
        cb(null,"./client/public/uploads/")
       
     }, filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, file.fieldname + '-' + uniqueSuffix)
     }
    }
    
)
const upload=multer({storage:storage})
const router=express.Router()
router.post('/login',login)
router.post('/register',body('email','enter valide email'),body('password','enter valide password'),
upload.single("image"),register)
router.get('/',authMiddleware,getUserInfo)
module.exports=router