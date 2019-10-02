var NODE_ENV = require('./keysconfig');
var express = require('express');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var FBStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy
const cookieSession = require('cookie-session')
const cors = require('cors')
const url = require('url'); 
const { URLSearchParams } = require('url'); 
const fetch = require('node-fetch')
const withQuery = require('with-query').default
var trustProxy = false;
require('module-alias/register')
const _ = require('lodash')
const path = require('path');
const fs =require('fs')
var cookieParser = require('cookie-parser')
var mobileDetect = require('mobile-detect')
var admin = require('firebase-admin')
const stringifyObject= require('stringify-object')
const uuidv4 = require('uuid/v4')
const mongoose = require('mongoose');
var favicon = require('serve-favicon')
const line = require('@line/bot-sdk')
const linemiddleware = require('@line/bot-sdk').middleware
const JSONParseError = require('@line/bot-sdk').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed
var https = require('https')
var http = require('http')
const client= new line.Client({channelAccessToken:NODE_ENV.LINE_CHANNEL_ACCESS_TOKEN})
const mongourlStringExpress='https://squwbs.herokuapp.com/mongouri'
const mongoURLAddWord='https://squwbs.herokuapp.com/addwordtomongo'
const mongoURLAddWordList='https://squwbs.herokuapp.com/addwordlisttomongo'

var firebaseConfig = {
    apiKey:NODE_ENV.FIREBASE_API_KEY
    ,authDomain:NODE_ENV.FIREBASE_AUTH_DOMAIN
    ,databaseURL:NODE_ENV.FIREBASE_DATABASE_URL
    ,projectId:NODE_ENV.FIREBASE_PROJECT_ID
    ,storageBucket:NODE_ENV.FIREBASE_STORAGE_BUCKET
    ,messagingSenderId:NODE_ENV.FIREBASE_MESSAGING_SENDER_ID
    ,appId:NODE_ENV.FIREBASE_APP_ID
}
var firebaseServiceKey = {
    "type": NODE_ENV.FIREBASE_TYPE,
    "project_id": NODE_ENV.FIREBASE_PROJECT_ID,
    "private_key_id": NODE_ENV.FIREBASE_PRIVATE_KEY_ID,
    "private_key": NODE_ENV.FIREBASE_PRIVATE_KEY.replace(/\\n/g,'\n'),
    "client_email": NODE_ENV.FIREBASE_CLIENT_EMAIL,
    "client_id": NODE_ENV.FIREBASE_CLIENT_ID,
    "auth_uri": NODE_ENV.FIREBASE_AUTH_URI,
    "token_uri": NODE_ENV.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": NODE_ENV.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": NODE_ENV.FIREBASE_CLIENT_x509_CERT_URL,
}

admin.initializeApp({
  credential:admin.credential.cert(firebaseServiceKey),
  databaseURL:firebaseConfig.databaseURL
})


module.exports.expressServer = function (portnumber){
if (process.env.DYNO) {
  trustProxy = true;
}
// var whitelist = ['https://squwbs.herokuapp.com/','https://squwbs.herokuapp.com/map'];
// const corsOptions={
//   origin:function(origin,cb){
//     if(whitelist.indexOf(origin)!==-1){
//       cb(null,true)
//     } else {
//       cb(new Error('Not allowed by CORS'))
//     }

//   }
// }
var user=[]
passport.use(new TwitterStrategy({
  consumerKey: NODE_ENV.TWITTER_CONSUMER_KEY,
  consumerSecret: NODE_ENV.TWITTER_CONSUMER_SECRET,
  callbackURL: NODE_ENV.TWITTER_CALLBACK_URL
},
function(accessToken, refreshToken, profile, cb) {
  return cb(null, profile);
}));
passport.use(new FBStrategy({
    clientID: NODE_ENV.FACEBOOK_CLIENT_ID
    ,clientSecret: NODE_ENV.FACEBOOK_CLIENT_SECRET
    ,callbackURL: NODE_ENV.FACEBOOK_CALLBACK_URL
    ,profileFields: ['id', 'email', 'gender', 'link','locale','name','timezone','updated_time','verified','displayName','photos']
  },
  function(accessToken, refreshToken, profile, cb) {

    return cb(null, profile);
  }));
passport.use(new GoogleStrategy({
  clientID: NODE_ENV.GOOGLE_CLIENT_ID,
  clientSecret: NODE_ENV.GOOGLE_CLIENT_SECRET,
  callbackURL:NODE_ENV.GOOGLE_CALLBACK_URL,
  scope:['email'
        , 'profile'],
  passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile,done) {

    return done(null, profile);
  }));


passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


var app = express();
//http.createServer(app).listen(80)
//https.createServer({}, app).listen(443)
// require('express-engine-jsx').attachTo(app, {
//   cache: path.join(__dirname, 'cache'), // required and should be absolute path to cache dir for compiled js files
//   views: path.join(__dirname, 'views'), // required and should be absolute path to views dir with jsx files
//   doctype: "<!DOCTYPE html>\n"   // optional and this is default value
// });
app.set('views', __dirname + '/views');
//app.set('view engine','jsx')
//app.engine('jsx',require('express-react-views').createEngine())
app.set('view engine','ejs')
//app.use(require('cookie-parser')());
//app.use(favicon(path.join(__dirname, '../../build', 'favicon.ico')))
app.use((err, req, res, next) => {
  if (err instanceof SignatureValidationFailed) {
    res.status(401).send(err.signature)
    return
  } else if (err instanceof JSONParseError) {
    res.status(400).send(err.raw)
    return
  }
  next(err) // will throw default 500
})
app.use(cookieParser('keyboard cat'))
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());
app.use(require('express-session')({ secret: 'keyboard cat',resave:true,saveUninitialized:true }));
app.use(express.static(path.join(__dirname, '../../build')));
app.use(express.static(path.join(__dirname, 'html/*/*')));
// app.use(cookieSession({
//   maxAge:100000,
//   keys:["keyboard cat"]
// }))
app.use(passport.initialize());
app.use(passport.session());


let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
var allowedOrigins = [
  'http://squwbs.herokuapp.com',
  'https://squwbs.herokuapp.com/',
  'https://squwbs-252702.appspot.com/',
  'http://squwbs-252702.appspot.com/',
  'https://squwbs.com',
  'http://squwbs.com'
];
app.use(allowCrossDomain);
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
// });

app.get('/cookies',cors(),(req,res)=>{

  //res.send(req.signedCookies)
  let options = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: true,// Indicates if the cookie should be signed
    secret:''
}
  res.cookie('name', 'name',options);
  //console.log(req.signedCookies)
  res.redirect('/')
})
app.get('/readCookies',function(req, res){
  //res.send(req.signedCookies);
  res.json(req.signedCookies)
});
// var conf={
//   originUndefined: function (req, res, next) {
 
//     if (!req.headers.origin) {

//         res.json({

//             mess: 'Hi you are visiting the service locally. If this was a CORS the origin header should not be undefined'

//         });

//     } else {

//         next();

//     }

//   },
//   cors:{
//     origin: function(origin, callback){
//       // allow requests with no origin 
//       // (like mobile apps or curl requests)
//         if(allowedOrigins.indexOf(origin)!==-1){
//           callback(null,true)
//         } else {
//           callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'),false)
//         }
//       },
//     optionsSuccessStatus: 200
//     }
// };
// app.use(cors(conf.cors))
// Define routes.
app.get('/', function (req, res) {
  // res.locals.lang = 'en';
  // res.locals.name='template'
  console.log(req.signedCookies)
  if(req.signedCookies.name!==undefined)
  {
    console.log(req.signedCookies.name)
  }
  else{
    res.render(path.join(__dirname, 'build', 'index.html'));
  }
app.get('/squwbs_api',function(req,res){
  res.redirect('/')
})
app.get('/login', function (req, res) {
    res.redirect('/')
    //res.sendFile(path.join(__dirname, '../../build', 'index.html'));
    res.render('login');
    // fs.readFile(path.join(__dirname, '../../build', 'index.html'),(err,data)=>{
    //   let htmlPlusData = data.toString().replace("MAPBOX_ACCESS_TOKEN_STRING",String(NODE_ENV.MAPBOX_ACCESS_TOKEN))
    //   res.send( htmlPlusData)
    // })
    //res.render('index',{ mapbox_access_token: NODE_ENV.MAPBOX_ACCESS_TOKEN })
  });  
  //res.render(path.join(__dirname, 'src', 'components','NoMatch.js'),{name:'Tobi'})
});
app.get('/getpaypalliveid',cors(),(req,res)=>{
  res.send({'paypalid':NODE_ENV.PAYPAL_LIVE_CLIENT_ID})
})

app.get('/getpaypalsandboxid',cors(),(req,res)=>{
  res.send({'paypalid':NODE_ENV.PAYPAL_SANDBOX_CLIENT_ID})
})
app.get('/getgooglepaysandboxready',cors(),(req,res)=>{
  res.send(
    {
      'paypalid':NODE_ENV.PAYPAL_SANDBOX_CLIENT_ID,
      'stripepublickey':NODE_ENV.STRIPE_PUBLISHABLE,
      'googlepaymerchantid':NODE_ENV.GOOGLE_PAY_MERCHANT_ID,
      'googlepaymerchantname':NODE_ENV.GOOGLE_PAY_MERCHANT_FIRST_NAME+' '+NODE_ENV.GOOGLE_PAY_MERCHANT_LAST_NAME

    }
  )
})
app.get('/getgooglepayliveready',cors(),(req,res)=>{
  res.send(
    {
      'paypalid':NODE_ENV.PAYPAL_LIVE_CLIENT_ID,
      'stripepublickey':NODE_ENV.STRIPE_PUBLISHABLE,
      'googlepaymerchantid':NODE_ENV.GOOGLE_PAY_MERCHANT_ID,
      'googlepaymerchantname':NODE_ENV.GOOGLE_PAY_MERCHANT_FIRST_NAME+' '+NODE_ENV.GOOGLE_PAY_MERCHANT_LAST_NAME

    }
  )
})
app.get('/mapboxtoken',cors(),(req,res)=>{
  //console.log(NODE_ENV.MAPBOX_ACCESS_TOKEN)
  res.send({"MAPBOX_ACCESS_TOKEN":NODE_ENV.MAPBOX_ACCESS_TOKEN})

})
app.get('/home',
  function(req, res) {
    if(req.user==undefined){
      res.render('home', { user: undefined });
    }
    else{
      res.render('home', { user: req.user.displayName });
    }
    
  });

// app.get('/login',
//   function(req, res){
//     res.locals.lang = 'en';
//     res.locals.name='template'
//     if(req.user==undefined){
//       res.render('login');
//     }
//     else{
//       res.redirect('/profile')
//     }
//   });

app.get('/login/facebook',
  passport.authenticate('facebook'
  ,{ scope: ['email'] }
  
  ));
app.get('/login/facebook/profile', 

  passport.authenticate('facebook',{successRedirect:'/profile',failureRedirect:'/login'})

)
app.get('/login/google',
  passport.authenticate('google'
    ,{scope:['profile']}
  ));

app.get('/login/google/profile',  
  passport.authenticate('google',{failureRedirect:'/login'}),
  function(req, res) {
  res.redirect('/profile');
});
app.get('/login/twitter',
  passport.authenticate('twitter')
);
app.get('/login/twitter/profile', 

  passport.authenticate('twitter',{failureRedirect:'/login'}),
  function(req, res) {

  res.redirect('/profile');
});

app.get('/cards',function(req,res){
  res.redirect('/')
})
app.get('/PDF',function(req,res){
  res.redirect('/')
})
app.get('/sound',function(req,res){
  res.redirect('/')
})

app.get('/todo', function (req, res) {
  //res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  res.redirect('/')
});

app.get('/catalogue', function (req, res) {
  //res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  res.redirect('/')
});

app.get('/category', function (req, res) {
  //res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  res.redirect('/')
});

app.get('/product', function (req, res) {
  //res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  res.redirect('/')
});

app.get('/map', function (req, res) {
  res.redirect('/')
  //res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  //res.render('Map', { mapbox_access_token: NODE_ENV.MAPBOX_ACCESS_TOKEN });
  // fs.readFile(path.join(__dirname, '../../build', 'index.html'),(err,data)=>{
  //   let htmlPlusData = data.toString().replace("MAPBOX_ACCESS_TOKEN_STRING",String(NODE_ENV.MAPBOX_ACCESS_TOKEN))
  //   res.send( htmlPlusData)
  // })
  //res.render('index',{ mapbox_access_token: NODE_ENV.MAPBOX_ACCESS_TOKEN })
});
app.get('/desktop',
  function(req,res){
    res.status(301).redirect('https://bgamut.github.io/desktop/');
  }
)
app.get('/profile',

  function(req, res){
  // if(req.user==undefined){
  //   res.redirect(url.format({
  //     pathname:"/"
  // })) 

  // }

  // else{

  //   res.redirect('/', { 
  //     provider:req.user.provider,
  //     id:req.user.id,
  //     displayName:req.user.displayName,
  //   });
  // }
  // else{

  //   res.render('profile', { 
  //     provider:req.user.provider,
  //     id:req.user.id,
  //     displayName:req.user.displayName,

  //   });
  // }
  let options = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: true,// Indicates if the cookie should be signed
    secret:''
}
  if(req.user==undefined){
    res.redirect(url.format({
      pathname:"/"
    }))
    //res.redirect('https://squwbs.com');
  }
  else{
    res.cookie('userName', req.user.displayName ,options);
    res.cookie('providerid',req.user.id,options)
    res.cookie('provider',req.user.provider,options)
    res.cookie('photo',req.user.photos[0].value,options)
    console.log('411 : ',stringifyObject(req.user.photos))
    //res.cookie('photos',req.user.)
    res.redirect(url.format({
      pathname:"/"
    }))
    //res.redirect('https://squwbs.com');
  }
  
  
});
app.get('/logout',function(req,res){
  //req.logout()
  //req.signedCookies = null
  let options = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: true,// Indicates if the cookie should be signed
    secret:''
  }
  
  //res.cookie('userName', undefined ,options);
  //res.cookie('providerid',undefined,options)
  //res.cookie('provider',undefined,options)
  res.clearCookie('userName')
  res.clearCookie('providerid')
  res.clearCookie('provider')
  res.redirect('/')
})

app.get('/download',function(req,res){

  res.download(__dirname+'/squwbs.zip')

})
app.get('/info',function(req,res){
  console.log('we in /info')
  
  //var obj = req.query
  //console.log(stringifyObject(obj))
  function buy(obj,func){
    //global.copy = Object.create(obj)
    console.log("raw object : ",obj)
    const tempUUID = uuidv4()
    global[tempUUID] = Object.create(obj)
    console.log("global element : ",stringifyObject(global[tempUUID]))
    // console.log(stringifyObject(global[tempUUID]))

    var db = admin.database()
    var ref = db.ref('sold')
    var userStructure = {
      provider:{
        google:'',
        facebook:''
      },
      names:{
        google:'',
        facebook:''
      },
      token:'',
    }
    var soldItemsStructure = {
      owner:{},
      items:[],
      uuid:''
    }
    
    userStructure.provider[String(global[tempUUID].provider)]=global[tempUUID].providerid
    userStructure.names[String(global[tempUUID].provider)]=global[tempUUID].userName
    userStructure.token=global[tempUUID]['connect.sid']
    soldItemsStructure.owner=userStructure
    if(global[tempUUID].itemList!=undefined&&global[tempUUID].itemList!=null){
      for(var i =0; i<global[tempUUID].itemList.length; i++){
        soldItemsStructure.items.push(global[tempUUID].itemList[i])
      }
    }
    
    if(global[tempUUID].uuid!=undefined&&global[tempUUID].uuid!=null){
      soldItemsStructure.uuid=global[tempUUID].uuid
    }
    
    console.log('soldItemsStructure : ',stringifyObject(soldItemsStructure))
    ref.once('value',function(snapshot){
      var soldHistory=snapshot.val()
      if(soldHistory==undefined){
        soldHistory={
          0:soldItemsStructure
        } 
      }
      else{
        var picked = soldHistory.find(sold=>sold.owner.provider[global[tempUUID].provider]==global[tempUUID].providerid)
        if(picked==undefined){
          soldHistory.push(soldItemsStructure)
        }
        else{
          //global.index=soldHistory.findIndex(sold=>sold.ownder.provider[copy.provider]==copy.providerid)
          
          //var index=soldHistory.findIndex(sold=>sold.owner.provider[global[tempUUID].provider]==global[tempUUID].providerid)
          
          for(var i =0; i<Object.keys(soldItemsStructure.items).length; i++){
            // var index = picked.items.findIndex(item=>item.kind=soldItemsStructure.items[i].kind&&item.id==soldItemsStructure[i].items.id)
            var index=undefined
            for(var j = 0; j<Object.keys(picked.items).length; j++){
              if(soldItemsStructure.items[i].kind==picked.items[j].kind){
                if(soldItemsStructure.items[i].id==picked.items[j].id){
                  index=j
                }
              }
              
              
            }
            if(index==undefined){
              //soldHistory[index].items.push(soldItemsStructure.items[i])
              picked.items.push(soldItemsStructure.items[i])
            }
          }
        }
      }
      ref.set(soldHistory,function(error){
        if(error){
          func(error)
        }
        else{
          //func(soldHistory[index])
          func(userStructure)
        }
      })
      // delete global.copy
      // delete global.index
      delete global[tempUUID]
    })
  }
  function sendObj(obj){
    res.send(obj)
  }
  //buy(obj,sendObj)
  buy(req.query,sendObj)
})
// app.get('/download', function (req, res) {
//   var options = {
//     method: 'GET',
//     host: 'localhost',
//     port: port,
//     path: '/file'
//   };

//   var request = http.request(options, function(response) {
//     var data = [];

//     response.on('data', function(chunk) {
//       data.push(chunk);
//     });

//     response.on('end', function() {
//       data = Buffer.concat(data);
//       console.log('requested content length: ', response.headers['content-length']);
//       console.log('parsed content length: ', data.length);
//       res.writeHead(200, {
//         'Content-Type': 'application/zip',
//         'Content-Disposition': 'attachment; filename=squwbs.zip',
//         'Content-Length': data.length
//       });
//       res.end(data);
//     });
//   });

//   request.end();
// });
app.get('/removeme',function(req,res){
  var obj = req.signedCookies
  console.log('/removeme signedCookies: ',stringifyObject(obj))
  //var obj = req.query

  //function addUser({userName,userEmail},func){
  function removeuser(obj,func){
    //var copy = Object.create(obj)

    //global.copy = Object.create(obj)
    const tempUUID = uuidv4()
    global[tempUUID] = Object.create(obj)

    console.log(stringifyObject(global[tempUUID]))
    var db = admin.database()
    //var ref = db.ref('users')
    var ref = db.ref('sold')

    // var userStructure = {
    //   provider:{
    //     google:'',
    //     facebook:''
    //   },
    //   names:{
    //     google:'',
    //     facebook:''
    //   },
    //   token:''
    // }
    //var userStructure = {}
    // userStructure.provider[String(copy.provider)]=copy.providerid
    // userStructure.names[String(copy.provider)]=copy.userName
    // userStructure.token=copy['connect.sid']
    //console.log(userStructure)

    ref.once('value',function(snapshot){
      var usersList=snapshot.val()
      //console.log('userlist function')
      if(usersList==undefined){
        //usersList={0:userStructure}
        console.log('userlist undefined')
      }
      else{
        var picked = usersList.find(user=>user.owner.provider[global[tempUUID].provider]==global[tempUUID].providerid)
        if(picked==undefined){
          //usersList.push(userStructure)
          console.log('no such user to remove')
        }
        else{
          var index=usersList.findIndex(user=>user.owner.provider[global[tempUUID].provider]==global[tempUUID].providerid)
          //usersList[index]=userStructure
          console.log('removing user index found', index)
          usersList.splice(index,1)
          //console.log(usersList)
        }

        
      }
      ref.set(usersList,function(error){
        if(error){
          //console.log(error)
          func(error)
        }
        else{
          //console.log('callback fired')
          func({message:"removed"})
        }

      })
      //delete global.copy
      delete global[tempUUID]
    })
  }
  
  function sendObj(obj){
    res.clearCookie('userName')
    res.clearCookie('providerid')
    res.clearCookie('provider')
    res.redirect('/')
    //res.send(obj)
    
  }
  
  removeuser(obj,sendObj)
  

  
  
})

//app.options('*', cors())
//var corsOptions = {origin:'https://squwbs.herokuapp.com/'}
app.get('/undefined',cors(),(req,res)=>{
  console.log('undefined reached')
  res.send({message:'undefined'})
})
app.get('/mapboxtoken',cors(),(req,res)=>{
  //console.log(NODE_ENV.MAPBOX_ACCESS_TOKEN)
  res.send({"MAPBOX_ACCESS_TOKEN":NODE_ENV.MAPBOX_ACCESS_TOKEN})

})
function handleEvent(event) {
  // if (event.type !== 'message' || event.message.type !== 'text') {
  //   // ignore non-text-message event
  //   return Promise.resolve(null);
  // }

  // // create a echoing text message
  // const echo = { type: 'text', text: event.message.text };

  // // use reply API
  // return client.replyMessage(event.replyToken, echo);
  console.log(stringifyObject(event))
}

app.post('/linewebhook'
        ,
        [
          cors(),
          linemiddleware({
              channelAccessToken:"JGMd3CQl+ouQjxwCR1LluhuclDFMiUdKqVXq8nrJmHk8BpHWiraHqSiie6QW3qKdcaCEo+Hc4SctGP3jfkLhnwCbEM7nwDOwnRX4gImAgWisQlBy1oo4NaBAeQk2MYNO/L9kA3OBUAVDIqBX6zg75QdB04t89/1O/w1cDnyilFU=",
              channelSecret:"73354a544d842dfaf3bd347203eef7f6"
            })
        ]
        ,
        (req,res)=>
          {
            // console.log(stringifyObject(req.body))
            // res.json(req.body)
            // .then(()=>{
            //   console.log("then")
            // }).catch((error)=>{
            //   console.log('error')
            // })
            //res.send(req.query)
            //res.json(req.body.events)
            //res.json(req.body.destination) //user id of the bot
            Promise
            .all(req.body.events.map(handleEvent))
            .then((result) => res.json(result))
            .catch((err) => {
              console.error(err);
              res.status(500).end();
            });
          }
)
app.post('/firebaseToken',cors(),(res,req)=>{
  res.send(req.body)
 
  let options = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: true,// Indicates if the cookie should be signed
    secret:''
}
  res.cookie('firebaseToken', req.body.token ,options);
})
app.get('/linesendmessage',cors(),(req,res)=>{
  //console.log('682:',stringifyObject(req.query.text))
  client.pushMessage(
    NODE_ENV.LINE_MY_USER_ID,
    {
      type:'text',
      text:req.query.text
    }
    )
    .then(()=>{
      res.send(
        {message:'message sent'}
      )
    })
    .catch((err)=>{
      res.send({error:err})
    })

})
app.get('/linegetmessage',cors(),(req,res)=>{
  var headers = {"Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            mode:'cors'
        };
  var token = NODE_ENV.LINE_CHANNEL_ACCESS_TOKEN
  var bearer = 'Bearer' +token
  headers["Authorization"]=bearer
  fetch('https://api.line.me/v2/bot/message/{messageId}/content', {
      headers
  })
  .then(result=>{
      //setContent({...content,...result.message})
      console.log('143:',stringifyObject(result.json()))
  })
  .catch((err)=>{
      console.error(err)
  })
  //console.log('701:',stringifyObject(req.query.text))
  // client.getMessageContent(NODE_ENV.LINE_MY_USER_ID)
  //   .then((stream)=>{
  //     stream.on('data',(chunk)=>{
  //       res.send(
  //         {message:chunk}
  //       )
  //     })
  //     stream.on('data',(err)=>{
  //       console.log(err)
  //       //res.send({error:err})
  //     })
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //     //res.send({error:err})
  //   })

})
app.get('/mongouri',cors(),(req,res)=>{
  //console.log(NODE_ENV.MAPBOX_ACCESS_TOKEN)
  res.send({"mongouri":NODE_ENV.MONGO_URI})

})
app.get('/line',cors(),(req,res)=>{
  res.send({
    'token':NODE_ENV.LINE_CHANNEL_ACCESS_TOKEN,
    'id':NODE_ENV.LINE_MY_USER_ID
  })
})
app.get('/instagramuri',cors(),(req,res)=>{
  //console.log(NODE_ENV.MAPBOX_ACCESS_TOKEN)
  res.send({"instagramuri":NODE_ENV.INSTAGRAM_URI})

})
app.get('/favicon.ico',cors(),(req,res)=>{
  //console.log(NODE_ENV.MAPBOX_ACCESS_TOKEN)
  res.sendFile(path.join(__dirname,'../../build','favicon.ico'))

})
app.get('/api',cors(),(req,res)=>{
  
  res.send(req.query)

})

app.post('/api',cors(),(req,res)=>{

  res.send(req.body)
  
})
app.get('/user',cors(),(req,res)=>{
  var obj = req.query

  //function addUser({userName,userEmail},func){
  function user(obj,func){
    //var copy = Object.create(obj)
    //global.copy = Object.create(obj)
    const tempUUID = uuidv4()
    global[tempUUID] = Object.create(obj)

    console.log(stringifyObject(global[tempUUID]))
    var db = admin.database()
    var ref = db.ref('users')
    var userStructure = {
      provider:{
        google:'',
        facebook:''
      },
      names:{
        google:'',
        facebook:''
      },
      token:''
    }
    //var userStructure = {}
    userStructure.provider[String(global[tempUUID].provider)]=global[tempUUID].providerid
    userStructure.names[String(global[tempUUID].provider)]=global[tempUUID].userName
    userStructure.token=global[tempUUID]['connect.sid']
    console.log(userStructure)

    ref.once('value',function(snapshot){
      var usersList=snapshot.val()
      //console,log('userlist function')
      if(usersList==undefined){
        usersList={0:userStructure}
      }
      else{
        var picked = usersList.find(user=>user.provider[global[tempUUID].provider]==global[tempUUID].providerid)
        if(picked==undefined){
          usersList.push(userStructure)
        }
        else{
          var index=usersList.findIndex(user=>user.provider[global[tempUUID].provider]==global[tempUUID].providerid)
          usersList[index]=userStructure
        }
        
      }
      ref.set(usersList,function(error){
        if(error){
          //console.log(error)
          func(error)
        }
        else{
          //console.log('callback fired')
          func(picked)
        }

      })
      //delete global.copy
      
      delete global[tempUUID]
    })
  }
  
  function sendObj(obj){
    res.send(obj)
  }

  user(obj,sendObj)

})
// app.get('/adduser',cors(),(req,res)=>{
//   var obj = req.query

//   //function addUser({userName,userEmail},func){
//   function addUser(object,func){
//     var db = admin.database()
//     var ref = db.ref('users')
//     // var user = {
//     //   'provider':{
//     //     'google':{
//     //       'providerid':''
//     //     },
//     //     'facebook':{
//     //       'providerid':''
//     //     }
//     //   },
//     //   'names':{
//     //     'google':'',
//     //     'facebook':''
//     //   },
//     //   'connect.sid':{

//     //   }
//     // }
    

//     ref.once('value',function(snapshot){
//       var usersList=snapshot.val()
//       if(usersList==undefined){
//         var userStructure={}
//         userStructure.provider[obj.provider]=obj.providerid
//         userStructure.names[obj.provider]=obj.Name
//         userStructure['connect.sid']=obj['connect.sid']
//         usersList={0:userStructure}
//       }
//       else{
//         var picked = usersList.find(user=>user.provider[obj.provider]==obj.providerid)
//         if(picked==undefined){
//           // console.log(picked==undefined)
//           var userStructure={}
//           userStructure.provider[obj.provider]=obj.providerid
//           userStructure.names[obj.provider]=obj.Name
//           userStructure['connect.sid']=obj['connect.sid']
//           usersList.push(userStructure)
//           console.log('user added')
//         }
//         else{
          
//           console.log('this user already exists')
//           picked['connect.id']=obj['connect.id']
//           var index=usersList.findIndex(user=>user.provider[obj.provider]==obj.providerid)
//           usersList[index]=picked
//         }
//       }
//       ref.set(usersList,function(error){
//         if(error){
//           console.log(error)
//           func(error)
//         }
//         else{
//           console.log('callback fired')
//           func({userName,userEmail})
//         }

//       })
//     })
//   }
  
//   function sendSuccess(message){
//     res.send({message:message})
//   }

//   addUser(obj,sendSuccess)

// })
// app.get('/getuser',cors(),(req,res)=>{
//   var obj = req.query
  
  
//   function getUser(userEmail){
 
//     var db = admin.database()
//     var ref = db.ref('users')
//     ref.once('value',function(snapshot){
//     var users=(snapshot.val())
//     var picked = users.find(user=>user.userEmail==userEmail)
//     console.log('found user data ' + 
//       stringifyObject(picked, {
//         indent: '  ',
//         singleQuotes: false
//       })
//     )
//     return(picked)
            
//     })
//   }
//   res.send(getUser(obj.userEmail))

// })
// app.get('/updateuser',cors(),(req,res)=>{
//   var obj = req.query
  

//   function updateUser(userEmail,dataName,data){
//     // admin.initializeApp({
//     //     credential:admin.credential.cert(firebaseServiceKey),
//     //     databaseURL:firebaseServiceKey.databaseURL
//     //   },uuidv4())
//     // initFirebase()
//      var db = admin.database()
//      var ref = db.ref('users')
//      ref.once('value',function(snapshot){
//        var usersList=snapshot.val()
//        if(usersList==undefined){
//             var user={userEmail:userEmail}
//             user[dataName]=data
//             usersList={0:user}
//        }
//        else{
//          var picked = usersList.find(user=>user.userEmail==userEmail)

//          if(picked==undefined){
//            console.log(picked==undefined)
//            picked={userEmail:userEmail}
//            picked[dataName]=data
//            usersList.push(picked)
//          }
//          else{
//            //console.log(_.isEqual(picked,{userName,userEmail}))
//            if(_.isEqual(picked[dataName],data)){
//              console.log(dataName+' for this user is already set like that.')
//            }
//            else{
//             picked[dataName]=data
//             var index=usersList.findIndex(user=>user.userEmail==userEmail)
//             usersList[index]=picked
//             console.log('updated the account information')
//            }
//          }
//        }
//        ref.set(usersList)
//      })
//     // global.admin.database().goOffline()
// }
//   for(var i = 0; i<Object.keys(obj);i++){
//     if(obj[Object.keys(obj)[i]]!=userEmail){
//       updateUser(obj.userEmail,Object.keys(obj)[i],obj[Object.keys(obj)[i]])
//     }
//   }
//   // admin.database().goOffline()
// })
// app.get('/deleteuser',cors(),(req,res)=>{
//   var obj = req.query
//   function deleteUser(userEmail){

//     var db = admin.database()
//     var ref = db.ref('users')
//     ref.once('value',function(snapshot){
//         var userList = snapshot.val()
//         var picked = userList.find(array=>array.userEmail==userEmail)
//         if(picked!=undefined){
//             userList.splice(userList.indexOf(picked),1)
//             ref.set(userList)
//             return({message: String(userEmail + ' removed')})
//         }
//         else{
//             return({message:'such user does not exist.'})
//         }
       
//     })

// }

// res.send(deleteUser(obj.userEmail))
// })

app.get('/addwordtomongo',cors(),(req,res)=>{
  var obj = req.query
  function addWordToMongo({word,meaning,example,pronunciation},callback){
    fetch(mongourlStringExpress, {
        credentials: "include"
      })
    .then(function(result){
      return result.json()
    })
    .then(function(json){      
      //mongouri=jsongmongouri
      var mongouri=json.mongouri
      console.log(mongouri)
      mongoose.connect(mongouri,{useNewUrlParser:true,useUnifiedTopology: true })
      .catch((err)=>{
        console.log(err)
      })
      var db = mongoose.connection
      
      db.once('open',function(){
        const CardSchema = new mongoose.Schema({
          word:{type:String,default:undefined},
          meaning:{type:String,default:undefined},
          example:{type:String,default:undefined},
          pronunciation:{type:String,default:undefined},
          thumbnail:{type:String,default:undefined},
          header:{type:String,default:undefined},
          subhead:{type:String,default:undefined},
          picture:{type:String,default:undefined},
          youtubeLink:{type:String,default:undefined},
          supportingText:{type:String,default:undefined},
          timeStamp:{type:String,default:Date()}
        })
        const Card = mongoose.model('Cards',CardSchema)
        Card.findOne({word:word},function(err,obj){
          console.log(obj)
          const newCard = new Card({
            word:word,
            meaning:meaning,
            example:example,
            pronunciation:pronunciation,
          })
          if(obj!==null){
            Card.findOneAndRemove(
              {"word":word },{useFindAndModify:false},function(){
                console.log('findOneAndRemove() function fired')
              }
            );
            
          }
          newCard.save()
          Card.updateOne(
            { omitUndefined: true },
            newCard
          );
          callback('successfully added '+word)

        })
        

        
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  function sendSuccess(message){
    res.json({message:message})
  }
  addWordToMongo(obj,sendSuccess)
  
})
// app.get('/addlist',cors(),(req,res)=>{
//   var wordList = req.query.list
//   //var wordList = req.body.list
//   //var mongouri=""
//   console.log(wordList)
//   const addWordList =(wordList,mongouri,callback)=>{
//     //const ObjectId=uuidv4()
//     callbackList=[]
//     mongoose.connect(mongouri,{useNewUrlParser:true, useUnifiedTopology: true })
//       .catch((err)=>{
//         console.log(err)
//         callbackList.push({message:err})
//         callback(callbackList)
//       })
//       var db = mongoose.connection
      
//       db.once('open',function(){
//         const CardSchema = new mongoose.Schema({
//           word:{type:String,default:undefined},
//           meaning:{type:String,default:undefined},
//           example:{type:String,default:undefined},
//           pronunciation:{type:String,default:undefined},
//           thumbnail:{type:String,default:undefined},
//           header:{type:String,default:undefined},
//           subhead:{type:String,default:undefined},
//           picture:{type:String,default:undefined},
//           youtubeLink:{type:String,default:undefined},
//           supportingText:{type:String,default:undefined},
//           timeStamp:{type:String,default:Date()}
//         }) 

//         //var Card = mongoose.model('Cards',CardSchema)
//         var Card = mongoose.model('Cards')
//         console.log(Card)

//         // for (var i=0; i<wordList.length; i++){
        
          
        
//         function addOneWordFromList(wordList,index){
          
//           var tempObject = wordList[index]
//           Card.findOne({word:tempObject.word},function(err,obj){
//             if(err){
//               console.log(err)
//               callbackList.push({message:err})
//               callback(callbackList)
//             }
            
//             const newCard = new Card(tempObject)
//             if(obj!==null){
//               console.log(obj.word +" already exists.")
//               //console.log(typeof(Card.findOneAndRemove))
//               Card.findOneAndRemove(
//                 {"word":tempObject["word"] },{useFindAndModify:false},function(){
//                   console.log('updating '+tempObject["word"])
//                 }
//               ).then(function(){
//                 newCard.save()
//                 .then(function(){
//                   Card.updateOne(
//                     { omitUndefined: true },
//                     newCard
//                   )
//                   .then(function(){
//                     var currentWord=tempObject["word"]
//                     var callbackObject = {}
//                     callbackObject[currentWord]='updated'
//                     //console.log(callbackObject)
//                     callbackList.push(callbackObject)
//                     console.log(currentWord+' has been saved')
//                   })
//                   .then(function(){
                    
                    
//                     if(index+1<wordList.length){
//                       addOneWordFromList(wordList,index+1)
//                     }
//                     else{
//                       db.close()
//                       callback(callbackList)
//                     }
//                   })
//                 })
//                 }
//               ) 
//             }
//             else{
//               newCard.save()
//               .then(function(){
//                 Card.updateOne(
//                   { omitUndefined: true },
//                   newCard
//                 )
//                 .then(function(){
  
//                   var currentWord=tempObject["word"]
//                   var callbackObject = {}
//                   callbackObject[currentWord]='saved'
//                   //console.log(callbackObject)
//                   callbackList.push(callbackObject)
//                   console.log(currentWord+' has been saved')
//                 })
//                 .then(function(){
                  
//                   locked=false
//                   if(index+1<wordList.length){
//                     addOneWordFromList(wordList,index+1)
//                   }
//                   else{
//                     db.close()
//                     callback(callbackList)
//                   }
//                 })
//               })
              
//             }
            
            
//           })
  
//         }
//         addOneWordFromList(wordList,0)      
//       })
//   }
  
//   function sendObj(obj){
//     res.json(obj)
//   }

//   fetch(mongourlStringExpress, {credentials: "include"})
//   .then(function(result){
//     return result.json()
//   })
//   .then(function(json){
//     var mongouri=json.mongouri
//     console.log(mongouri)
//     addWordList(wordList,mongouri,sendObj)
//   })
//   .catch(function(err){
//     sendObj({error:err})
//   })
  
// })
    
app.get('/getwordlistfrommongo',cors(),(req,res)=>{
  var wordList = req.query.list
  
  const getWordList =(wordList,mongouri,callback)=>{
    //const ObjectId=uuidv4()
    callbackList=[]
    mongoose.connect(mongouri,{useNewUrlParser:true, useUnifiedTopology: true })
      .catch((err)=>{
        console.log(err)
        callbackList.push({message:err})
        callback(callbackList)
      })
      var db = mongoose.connection
      
      db.once('open',function(){
        const CardSchema = new mongoose.Schema({
          word:{type:String,default:undefined},
          meaning:{type:String,default:undefined},
          example:{type:String,default:undefined},
          pronunciation:{type:String,default:undefined},
          thumbnail:{type:String,default:undefined},
          header:{type:String,default:undefined},
          subhead:{type:String,default:undefined},
          picture:{type:String,default:undefined},
          youtubeLink:{type:String,default:undefined},
          supportingText:{type:String,default:undefined},
          timeStamp:{type:String,default:Date()}
        })
        var Card = mongoose.model('Cards',CardSchema)
        // for (var i=0; i<wordList.length; i++){
        Card.find({})
        .then(function(result){
          var list=[]
          for (var i =0; i<result.length; i++){
            list.push(result[i]._doc)
          }
          callback({data:list})
        })
        .then(function(){
          db.close()
        })
        //return Card.find({})
  
      })
  }
  
  
  function sendObj(obj){
    res.json(obj)
  }

  fetch(mongourlStringExpress, {credentials: "include"})
  .then(function(result){
    return result.json()
  })
  .then(function(json){
    getWordList(wordList,json.mongouri,sendObj)
  })
  .catch(function(err){
    sendObj({error:err})
  })
  
})

app.get('/addword',cors(),(req,res)=>{
  var obj = req.query
  function addWord({word,meaning,pronunciation,example},func){
    
    var db = admin.database()
    var ref = db.ref('words')
    ref.once('value',function(snapshot){
        var words=snapshot.val()
        console.log(words)
        if(words==undefined){
            words={0:{word,meaning,pronunciation,example}}
        }
        else{
            var picked = words.find(singleWord=>singleWord.word==word)
            console.log(picked)
            if(picked==undefined){  
                
                words.push({word,meaning,pronunciation,example})
            }
            else{
                if(_.isEqual(picked,{word,meaning,pronunciation,example})){

                    console.log('this word already exists')
                }
                else{
                    console.log('this word already exists would you like to update the information')
                }
            }
        }
        ref.set(words,function(error){
          if(error){
            console.log(error)
            res.setHeader('Content-Type','application/json')
            res.send({message:message})
            //func(error)
          }
          else{
            console.log('callback fired in /addWord')
            //func(words)
            res.setHeader('Content-Type','application/json')
            res.send({message:message})
          }

        })
    })
}
  function sendSuccess(message){
  res.send({message:message})
}
  addWord(obj,sendSuccess)
  
})


app.get('/addwordlist',cors(),(req,res)=>{
  var list = req.query.list
  function addWordList(list){
    
    var db = admin.database()
    var ref = db.ref('words')
    ref.once('value',function(snapshot){
        var words=snapshot.val()
        //console.log(words)
        if(words==undefined){
          words={}
          for (var i=0; i<list.length; i++){
            words[i]=list[i]
          }  
        }
        else{
          for(var i =0; i<list.length; i++){
            //words.push(list[i])
            var picked = words.find(singleWord=>singleWord.word==list[i].word)
            console.log(picked)
            if(picked==undefined){  
                words.push(list[i])
            }
            else{
                if(_.isEqual(picked,list[i])){
                    console.log(list[i].word+' already exists')
                }
                else{
                    words[words.findIndex(row=>row.word==list[i].word)]=list[i]
                    console.log(list[i].word+' updated to the information provided')
                }
            }
          }
            
        }
        ref.set(words,function(error){
          if(error){
            console.log(error)
            res.setHeader('Content-Type','application/json')
            res.send({message:error})
            //func(error)
          }
          else{
            console.log('callback fired in /addWordList')
            //func(words)
            res.setHeader('Content-Type','application/json')
            res.send({message:'success!'})
          }

        })
    })
}
// const addWordList =(wordList,callback)=>{
//   callbackList=[]
//   mongoose.connect(mongouri,{useNewUrlParser:true, useUnifiedTopology: true })
//     .catch((err)=>{
//       console.log(err)
//       callbackList.push({message:err})
//       callback(callbakList)
//     })
//     var db = mongoose.connection
    
//     db.once('open',function(){
//       const CardSchema = new mongoose.Schema({
//         word:{type:String,default:undefined},
//         meaning:{type:String,default:undefined},
//         example:{type:String,default:undefined},
//         pronunciation:{type:String,default:undefined},
//         thumbnail:{type:String,default:undefined},
//         header:{type:String,default:undefined},
//         subhead:{type:String,default:undefined},
//         picture:{type:String,default:undefined},
//         youtubeLink:{type:String,default:undefined},
//         supportingText:{type:String,default:undefined},
//         timeStamp:{type:String,default:Date()}
//       })
//       var Card = mongoose.model('Cards',CardSchema)

      
//       function addOneWordFromList(wordList,index){
        
//         var tempObject = wordList[index]
//         Card.findOne({word:tempObject.word},function(err,obj){
//           if(err){
//             console.log(err)
//             callbackList.push({message:err})
//             callback(callbakList)
//           }
          
//           const newCard = new Card(tempObject)
//           if(obj!==null){
//             console.log(obj.word +" already exists.")
//             //console.log(typeof(Card.findOneAndRemove))
//             Card.findOneAndRemove(
//               {"word":tempObject["word"] },{useFindAndModify:false},function(){
//                 console.log('updating '+tempObject["word"])
//               }
//             ).then(function(){
//               newCard.save()
//               .then(function(){
//                 Card.updateOne(
//                   { omitUndefined: true },
//                   newCard
//                 )
//                 .then(function(){
//                   var currentWord=tempObject["word"]
//                   var callbackObject = {}
//                   callbackObject[currentWord]='updated'
//                   //console.log(callbackObject)
//                   callbackList.push(callbackObject)
//                   console.log(currentWord+' has been saved')
//                 })
//                 .then(function(){
                  
                  
//                   if(index+1<wordList.length){
//                     addOneWordFromList(wordList,index+1)
//                   }
//                   else{
//                     db.close()
//                     callback(callbackList)
//                   }
//                 })
//               })
//               }
//             ) 
//           }
//           else{
//             newCard.save()
//             .then(function(){
//               Card.updateOne(
//                 { omitUndefined: true },
//                 newCard
//               )
//               .then(function(){

//                 var currentWord=tempObject["word"]
//                 var callbackObject = {}
//                 callbackObject[currentWord]='saved'
//                 //console.log(callbackObject)
//                 callbackList.push(callbakObject)
//                 console.log(currentWord+' has been saved')
//               })
//               .then(function(){
                
//                 locked=false
//                 if(index+1<wordList.length){
//                   addOneWordFromList(wordList,index+1)
//                 }
//                 else{
//                   db.close()
//                   callback(callbackList)
//                 }
//               })
//             })
            
//           }
          
          
//         })

//       }
//       addOneWordFromList(wordList,0)      
//     })
// }
//   function sendSuccess(message){
//   res.send({message:message})
// }
  addWordList(list)
  
})

app.get('/getwordlist',cors(),(req,res)=>{

  var getWordList = new Promise(
    
    function(resolve,reject){
      var db = admin.database()
      var ref = db.ref('words')
      ref.once('value',function(snapshot){
          var words=snapshot.val()

          //console.log(stringifyObject(words))
          if(words!=undefined){
            resolve (words)
          }
          else{
            reject (words)
          } 
      })
    }
  ) 

  getWordList
  .then((words)=>{
    //console.log(stringifyObject(words))
    res.send({
      message:'success',
      words:words
    })
    // res.send({
    //   message:'success',
    //   words:JSON.stringify(words)
    // })
  })
  .catch((err)=>{
    console.log("getWordList error : "+ err)
  })
  
  // res.send({
  //   message:'success',
  //   words:words
  // })
  
})
  

app.get('/ebay',cors(),(req,res)=>{
    fetch(withQuery('https://squwbs.herokuapp.com/api'
    ,req.query
    ))
    .then(result=>{
      return result.json()
    })
    .then((json)=>{
      res.send(json)
    })
    .catch((err)=>{

    })

})

app.get('/mobileCheck',cors(),(req,res)=>{
  //the following doesn't really give us any useful info besides the fact that it gives us maxwidth
  var md = new mobileDetect(req.headers['user-agent'])
  console.log(md)
})
app.get('/formula',cors(),(req,res)=>{
  function formula(a,b){
    var c = a+b
    console.log('this fired '+c)
  }
  res.send({
    code:formula.toString()
  })
  // the following defines formula
  //var a
  //fetch('/formula')
  // .then((res)=>{
  //   return res.json()
  // })
  // .then((json)=>{
  //   a=(json.code)
  //   console.log(json.code)
  // })
  //eval(a)
})
app.get('/api/jsonTester',cors(),async(req,res)=>{
  try{

  }
  catch(error){
    console.log(error)
  }
})
app.get('/verifytoken',cors(),(req,res)=>{
  async function verfiyToken(req,res,next){
    const idToken=req.headers.authorization;
    try{
      const decodedToken = await admin.auth().verifyIdToken(idToken)
      if(decodedToken){
        req.body.uid=decodedToken.uid
        return next()
      }
      else{
        return res.status(401).send('you are not authorized')
      }
    }
    catch(e){
      return res.status(401).send('you are not authorized.')
    }
  }
}) 
console.log('server started in port number : '+String(portnumber))
app.listen(process.env['PORT'] || portnumber);


}

