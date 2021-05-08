const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const routes=require('./route');

const PORT=5000;

const dbURI="YOUR_MONGO_URI"

const app=express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
 .then(()=>{
 app.listen(PORT,(req,res)=>{
 console.log(`connected to db`);
 })
 })
 .catch(err=>{
 console.log(err);
 })


app.use(bodyParser.json())
app.use(routes)
