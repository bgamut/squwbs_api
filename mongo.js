const fetch = require('node-fetch');
const MongoClient = require('mongodb').MongoClient;
//const uri = "mongodb+srv://Bernard:<password>@sat-55zib.azure.mongodb.net/test?retryWrites=true&w=majority";
var mongouri=''
fetch('https://squwbs.herokuapp.com/mongouri', {
    credentials: "include"
  })
.then(resulst=>{
  return resulst.json()
})
.then((json)=>{
  mongouri=json.MONGO_URI
  console.log(mongouri)
  const client = new MongoClient(mongouri, { useNewUrlParser: true });
  client.connect(function(err){
  const collection = client.db("SAT").collection("words");
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ],function(err,result){
      console.log(err)
  })

  //this returns the array
  collection.find({}).toArray(function(err,docs){
      console.log(docs)
  })

  // this searches parameters and returns array
  collection.find({a:1}).toArray(function(err,docs){
    console.log(docs)
})
  // close connection
  client.close();
});
})
.catch((err)=>{

})

