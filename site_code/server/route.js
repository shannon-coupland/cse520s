const express=require('express');
const imageController=require('./controller');

const router=express.Router();

module.exports=router.get('/images',imageController.getImages);
