module.exports = async function getClient() {
  const MongoClient = require('mongodb').MongoClient;
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dgdr9.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(uri, { useNewUrlParser: true });

  const collection = client.db(process.env.DB_NAME).collection("original-tankers");

  const tankers = await collection.find();
  await tankers.forEach(tanker => console.log(tanker));

  client.close();
}
