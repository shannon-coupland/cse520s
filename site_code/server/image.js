const mongoose=require('mongoose');

const imageSchema=mongoose.Schema({
 image:{
 type:String,
 required:true
 },
 date:{
 type:String,
 required:true
 },
 known:{
   type:Boolean,
   required:true
 }
},{collection : 'ImagesDB'});

const Image=mongoose.model('images',imageSchema);
module.exports=  Image ;
