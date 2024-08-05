const express = require('express');
const router = express.Router();
const userController=require('../controllers/userControllers')

router.post('/' ,userController.registerUser),
router.post('/login' ,userController.authUser),


module.exports=router