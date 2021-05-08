const Image=require('./image');
const { MongoClient } = require("mongodb");
const uri ="YOUR_MONGO_URI";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getImages=(req,res)=>{

  async function run() {
    let item_list = [];
    try {
      await client.connect();
      const database = client.db("ImagesDB");
      const images = database.collection("images");

      const query = {};
      const options = {
            projection: { _id: 0, image: 1, date: 1, known: 1 },
          };

      const cursor = images.find(query,options);
      // print a message if no documents were found
      if ((await cursor.count()) === 0) {
        console.log("No documents found!");
      }
      // replace console.dir with your callback to access individual elements

      await cursor.forEach(function(myDoc) { item_list.push(myDoc) });
      console.log(item_list[0].image);
      //await cursor.forEach(console.dir);
    } finally {
      await client.close();
      console.log("close");
      return item_list;
    }
  }
  run().then(result=>{
 console.log('result: ',result)
 res.send(result.length>0?result:'No E');
 })
 .catch(err=>{
 console.log(err);
 })
}
module.exports={
 getImages
}
