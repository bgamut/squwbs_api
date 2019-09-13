
var mongouri = "mongodb+srv://Bernard:90-=op[]@sat-55zib.azure.mongodb.net/test?retryWrites=true&w=majority";
const mongourlStringExpress='https://squwbs.herokuapp.com/mongouri'
const mongourlAddWord='https://squwbs.herokuapp.com/addWordToMongo'
const fetch = require('node-fetch');
const mongoose = require('mongoose');


// following needs to be added to the server side code 
// because starbucks cuts off the following code to return 
// Error: querySrv ENODATA _mongodb._tcp.sat-55zib.azure.mongodb.net at QueryReqWrap.onresolve [as oncomplete] (dns.js:197:19)
// https://stackoverflow.com/questions/54484673/error-querysrv-enodata-mongodb-tcp-blog-cluster-0hb5z-mongodb-net-at-queryreq

// app.get('/addWordToMongo',cors(),(req,res)=>{
//   var obj = req.query
//   function addWordToMongo({word,meaning,example,pronunciation},callback){
//   fetch(mongourlStringExpress, {
//       credentials: "include"
//     })
//   .then(function(result){
//     return result.json()
//   })
//   .then(function(json){      
//     mongouri=json.mongouri
//     console.log(mongouri)
//     mongoose.connect(mongouri,{useNewUrlParser:true})
//     .catch((err)=>{
//       console.log(err)
//     })
//     var db = mongoose.connection
    
//     db.once('open',function(){
//       console.log('connected')
//         const ObjectId=Schema.ObjectId
//         console.log(ObjectId)
//         const CardSchema = new mongoose.Schema({
//           id:{type:String,default:ObjectId},
//           word:{type:String,default:""},
//           meaning:{type:String,default:""},
//           example:{type:String,default:""},
//           pronunciation:{type:String,default:""},
//           thumbnail:{type:String,default:""},
//           header:{type:String,default:""},
//           subhead:{type:String,default:""},
//           picture:{type:String,default:""},
//           youtubeLink:{type:String,default:""},
//           supportingText:{type:String,default:""},
//           timeStamp:{type:String,default:Date()}
//         })
//         var Card = mongoose.model('Cards',CardSchema)
//         var word = new Card({
//             word:word,
//             meaning:meaning,
//             example:example,
//             pronunciation:pronunciation,
//         })
//         word.save(function(err,word){
//             if(err){
//                 console.error(err)
//             }
//             else{
//                 console.log(word.word+' saved')
//                 callback(word.word+' saved')
//             }
//         })
//         //list all of the cards
//         Card.find(function(err,cards){
//             if(err){
//                 console.error(err)
//             }
//             else{
//                 console.log(cards)
//             }
//         })
//         //find a specific card
//         Card.find(
//             {
//                 word:word,
//                 meaning:meaning,
//             }
//         ,function(input){
//           console.log(input)
//         })
//     })
//   })
//   .catch((err)=>{
//     console.log(err)
//   })
//   }

//   function sendSuccess(message){
//     res.send({message:message})
//   }
//   addWordToMongo(obj,sendSuccess)
  
// })

const addWordToMongoViaServer = ({word,meaning,example,pronunciation})=>{

  var a = {word,meaning,example,pronunciation}
  for (var i = 0; i<Object.keys(a).length; i++){
      if(a[Object.keys(a)[i]]==undefined){
          a[Object.keys(a)[i]]=""
      }
  }
  word=a.word
  meaning=a.meaning
  example=a.example
  pronunciation=a.pronunciation
  console.log(word,meaning,example,pronunciation)
  fetch(withQuery.default(mongourlAddWord, {
    word:word,
    meaning:meaning,
    example:example,
    pronunciation:pronunciation,
    mode:'cors'
  }))
  .then(resulst=>{
      return resulst.json()
    })
    .then((json)=>{
      console.log(json)
    })
    .catch((err)=>{
      console.log(err)
    })
}

var word = {
  word:"sat",
  meaning:'앉다의 과거형'
} 

addWordToMongoViaServer(word)
