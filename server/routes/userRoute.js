const express = require('express')
const { register } = require('../controllers/userController')
const { login } = require('../controllers/userController')
const { getUserInfo } = require('../controllers/userController')
const { authMiddleware } = require('../middlewares/authMiddlewares')
const { body } = require('express-validator');
const multer = require("multer")
const path = require('path')
const Jimp = require("jimp");
const uuid = require("uuid");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
}

const storage = multer.diskStorage({
  //multers disk storage settings
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];

    cb(null, uuid.v4() + "." + ext);
  },
});

const upload = multer({
  //multer settings
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
}).single("image");

const router=express.Router()
router.post('/login',login)
router.post('/register',body('email','enter valide email'),body('password','enter valide password'),
(req, res, next) => {
    upload(req, res, (err) => {
      try {
        if (err) return res.json({ message: err.message });
      if (!req.file) return res.json({ message: "Please upload a file" });
      //req.body.image =`http://localhost:5000/uploads/${req.file.filename}`
      req.body.image = req.file.filename;
      Jimp.read(req.file.path, function (err, test) {
        if (err) throw err;
        test
          .resize(100, 100)
          .quality(50)
          .write("/uploads/" + req.body.image);
        next();console.log(req.body.image )
      });
      } catch (error) {
      
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
      })
  },register)
router.get('/',authMiddleware,getUserInfo)
module.exports=router

/*
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
const upload=multer({storage:storage})*/