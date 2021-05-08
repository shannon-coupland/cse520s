const { MongoClient } = require("mongodb");
const uri ="YOUR_MONGO_URI";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
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
    let item_list = [];
    await cursor.forEach(function(myDoc) { item_list.push(myDoc) });
    console.log(item_list[0].image);
    //await cursor.forEach(console.dir);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
