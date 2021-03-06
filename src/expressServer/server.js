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
const functions = require('firebase-functions');
const stringifyObject= require('stringify-object')
const uuidv4 = require('uuid/v4')
//const mongoose = require('mongoose');
var favicon = require('serve-favicon')
//const line = require('@line/bot-sdk')
//const linemiddleware = require('@line/bot-sdk').middleware
//const JSONParseError = require('@line/bot-sdk').JSONParseError
//const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed
var https = require('https')
//var http = require('http')
//const client= new line.Client({channelAccessToken:NODE_ENV.LINE_CHANNEL_ACCESS_TOKEN})
const mongourlStringExpress='https://squwbs-252702.appspot.com/mongouri'
const mongoURLAddWord='https://squwbs-252702.appspot.com/addwordtomongo'
const mongoURLAddWordList='https://squwbs-252702.appspot.com/addwordlisttomongo'
const session = require('express-session');
//const MongoStore = require('connect-mongo')(session);
const webpush=require('web-push')
const OAuth = require('oauth').OAuth
const tumblr = require('tumblr')
const vapidKeys = webpush.generateVAPIDKeys()
webpush.setGCMAPIKey(NODE_ENV.FIREBASE_API_KEY)
webpush.setVapidDetails(
  'mailto:bernardahn@squwbs.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}



var flash = require('connect-flash')
var net = require('net')
//var FCM = require('push-fcm')
var FCM = require('fcm-push')
var fcm = new FCM(NODE_ENV.FIREBASE_SERVER_KEY)
var server = net.createServer(function(socket){
  socket.write('Echo server\r\n')
  socket.pipe(socket)
})
server.listen(1337)

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
  //credential:admin.credential.applicationDefault()
  databaseURL:firebaseConfig.databaseURL
})
global.chatHistory=[]


// var ref = admin.database().ref('chat')
// ref.once('value',function(snapshot){
//   if (snapshot!=undefiend){
//     global.chatHistory=snapshot
//   }
// })
// functions.database 
//   .ref('chat')
//   .onWrite((change,context)=>{
//   console.log('firebase function fired from message.js 75',change.after.val())
// })
// functions.database 
//   .ref('chat')
//   .onUpdate((change,context)=>{
//   console.log('firebase function fired from message.js 80',change.after.val())
// })
// functions.firestore.document('data/users').onUpdate(change=>{
//   const after = change.after.data()
//   console.log('server 91: onUpdate fired')
//   console.log(after)
//   const payload={
//     data:{
//       temp:String(after)
//     }
//   }
//   admin.messaging().sendToTopic('chat',payload)
// })
// functions.firestore.document('data/users').onDelete((snap,context )=>{
//   const data = snap.data()
//   console.log('server 102: onDelete fired')
//   console.log(data)
//   const payload={
//     data:{
//       temp:String(after)
//     }
//   }
//   admin.messaging().sendToTopic('chat',payload)
// })
// functions.firestore.document('data/users').onCreate((snap,context )=>{
//   const data = snap.data()
//   console.log('server 102: onCreate fired')
//   console.log(data)
//   const payload={
//     data:{
//       temp:String(after)
//     }
//   }
//   admin.messaging().sendToTopic('chat',payload)
// })
// functions.firestore.document('data/users').onWrite(change=>{
//   const after = change.after.data()
//   console.log('server 91: onWrite fired')
//   console.log(after)
//   const payload={
//     data:{
//       temp:String(after)
//     }
//   }
//   admin.messaging().sendToTopic('chat',payload)
// })



functions.firestore.document('data/users').onUpdate(change=>{
    const after = change.after.data()
    console.log('server 91: onUpdate fired')
    console.log(after)
    const payload={
      data:{
        temp:String(after)
      }
    }
    admin.messaging().sendToTopic('chat',payload)
})
functions.database.ref('sold').onDelete((snap,context )=>{
  const data = snap.data()
  console.log('server 102: onDelete fired')
  console.log(data)
  const payload={
    data:{
      temp:String(after)
    }
  }
  admin.messaging().sendToTopic('chat',payload)
})
functions.database.ref('sold').onCreate((snap,context )=>{
  const data = snap.data()
  console.log('server 102: onCreate fired')
  console.log(data)
  const payload={
    data:{
      temp:String(after)
    }
  }
  admin.messaging().sendToTopic('chat',payload)
})
functions.database.ref('sold').onWrite(change=>{
  const after = change.after.data()
  console.log('server 91: onWrite fired')
  console.log(after)
  const payload={
    data:{
      temp:String(after)
    }
  }
  admin.messaging().sendToTopic('chat',payload)
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

//const http = require('http').createServer(app)
// const io = require('socket.io')(http)
// io.on('connection',function(socket){
//   console.log('there was a connection by socket io')
//   // socket.emit('chat-message','hello world')
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//   });
//   socket.on('disconnet',function(){
//     console.log('user disconnected')
//   })
// })


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
  res.locals.session = req.session
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
// app.use(session({ 
//     secret: 'keyboard cat',
//     resave:true,
//     saveUninitialized:true,
//     store: new MongoStore(
//       {
//         url:NODE_ENV.MONGO_URI, 
//         ttl:900, 
//         secret:'squirrel',
//         autoRemove:'interval', 
//         autoRemoveInterval:60
//       }
//     ),
//     cookie:
//       {
//         httpOnly: true,
//         secure:true,
//         sameSite:false
//       },
    

// }));
app.use(flash())
app.use(express.static(path.join(__dirname, '/../../build')));
app.use(express.static(path.join(__dirname, '/html/*/*')));
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
    secret:'',
    secure:true,
    sameSite:true

}
  res.cookie('name', 'name',options);
  //console.log(req.signedCookies)
  res.redirect('/')
})
app.get('/disqus',function(req,res){
  fetch('https://disqus.com/api/oauth/2.0/access_token')
  .then(result=>{
      //console.log('disqus fetch')
      return result.json()
    })
    .then((json)=>{
     
      console.log('/disqus',stringifyObject(json))
      return json
      res.json(json)
    })
    .catch((err)=>{
      console.error(err)
    })
})
app.get('/tumblrAuth',cors(),function(req,res){
  //const getTumblrPosts=(page)=>{
  // const getTumblrOAuth=(page)=>{
    var temp=[]
    // const appConsumerKey = 'ZcMcl1wmyAyF3xr1TnkjIlgU8G7xJK1wmoGfG1sULTL1wpWE9t'
    // const appConsumerSecret='3LIzxmGOfmrjIgT1cHDyECMNrHtxZ3TomNOTCY7sKoOQC3cxjq'
    const appConsumerKey = NODE_ENV.TUMBLR_OAUTH_CONSUMER_KEY
    const appConsumerSecret=NODE_ENV.TUMBLR_SECRET_KEY
    const authorizeUrl = 'https://www.tumblr.com/oauth/authorize';
    const requestTokenUrl = 'https://www.tumblr.com/oauth/request_token';
    const accessTokenUrl = 'https://www.tumblr.com/oauth/access_token';
    const oa = new OAuth(
        requestTokenUrl,
        accessTokenUrl,
        appConsumerKey,
        appConsumerSecret,
        '1.0A',
        'https://squwbs.com',
        'HMAC-SHA1'
    );
  
    oa.getOAuthRequestToken(function (err, token, secret) {
        if (err) {
        console.error('\tFailed with error getTumblrPosts', err);
        }
        console.log('\ttoken %s | secret %s', token, secret);
        var oauth={
            consumer_key:appConsumerKey,
            consumer_secret:appConsumerSecret,
            token:token,
            token_secret:secret,
        }
        res.json(oauth)
        // return oauth
        // var blog = new tumblr.Blog('gamutperiod.tumblr.com',oauth)
        // blog.posts({limit:50,offset:(page)*50},function(err,response){
        //     if(err){
        //         console.log(err)
        //     }
        //     for (var i =0; i<response.posts.length; i++){
        //         if(response.posts[i].type=='video'){
        //             if(response.posts[i].video!==undefined){
        //                 if(response.posts[i].video.youtube!==undefined){
        //                     temp.push(
        //                     {
        //                         type:'video',
        //                         url:response.posts[i].short_url,
        //                         id:response.posts[i].id,
        //                         time:response.posts[i].timestamp,
        //                         video:response.posts[i].video.youtube.video_id
        //                     }
        //                     )
        //                 }
        //             }
                    
        //         }
                
        //         if(response.posts[i].type=='photo'){
        //             var photoList=[]
        //             if(response.posts[i].image_permalink==undefined){
                        
        //                 for(var j = 0; j<response.posts[i].photos.length; j++){
        //                     photoList.push(response.posts[i].photos[j].original_size.url)
        //                 }
        //             }
        //             else{
        //                 photoList.push(response.posts[i].image_permalink)
        //             }
        //             temp.push(
        //             {
        //                 type:'photo',
        //                 url:response.posts[i].short_url,
        //                 id:response.posts[i].id,
        //                 time:response.posts[i].timestamp,
        //                 photo:photoList
        //             }
        //             )
        //         }
        //         if(response.posts[i].type=='quote'){
        //             temp.push(
        //             {
        //                 type:'quote',
        //                 url:response.posts[i].short_url,
        //                 id:response.posts[i].id,
        //                 time:response.posts[i].timestamp,
        //                 quote:response.posts[i].text
        //             }
        //             )
        //         }
        //         if(response.posts[i].type=='audio'){
        //             temp.push(
        //             {
        //                 type:'audio',
        //                 url:response.posts[i].short_url,
        //                 id:response.posts[i].id,
        //                 time:response.posts[i].timestamp,
        //                 audio:response.posts[i].audio_url
        //             }
        //             )
        //         }
  
        //         if(response.posts[i].type=='text'){
        //             temp.push(
        //             {
        //                 type:'text',
        //                 url:response.posts[i].short_url,
        //                 id:response.posts[i].id,
        //                 time:response.posts[i].timestamp,
        //                 text:response.posts[i].body
        //             }
        //             )
        //         }
        //         if(response.posts[i].type=='link'){
        //             if(response.posts[i].link_image!==undefined){
        //                 temp.push(
        //                 {
        //                     type:'link',
        //                     url:response.posts[i].short_url,
        //                     id:response.posts[i].id,
        //                     time:response.posts[i].timestamp,
        //                     link:response.posts[i].url,
        //                     image:response.posts[i].link_image
        //                 }
        //                 )
        //             }
        //             else{
        //             temp.push(
        //                 {
        //                 type:'link',
        //                 url:response.posts[i].short_url,
        //                 id:response.posts[i].id,
        //                 time:response.posts[i].timestamp,
        //                 link:response.posts[i].url,
        //                 image:undefined
        //                 }
        //             )
        //             }
        //         }
        //         if(response.posts[i].type=='chat'){
        //             var chatList=[]
        //             for (var j = 0; j<response.posts[i].dialogue.length;j++){
        //                 console.log(response.posts[i].dialogue[j].name+':'+response.posts[i].dialogue[j].phrase)
        //                 chatList.push(String(response.posts[i].dialogue[j].name)+' : '+String(response.posts[i].dialogue[j].phrase))
        //             }
        //             temp.push(
        //             {
        //                 type:'chat',
        //                 url:response.posts[i].short_url,
        //                 id:response.posts[i].id,
        //                 time:response.posts[i].timestamp,
        //                 url:response.posts[i].url,
        //                 chat:chatList
        //             }
        //             )
        //         }
                
        //     }
            
        //     console.log('this is the posts returned : ',stringifyObject(posts,{
        //       indent: ' ',
        //       singleQuotes:false
        //     }))
        //     return temp
        // })
    })
    
  // }
  // if(req.query.page!==undefined){
  //   //var posts=getTumblrPosts(req.query.page)
  // }
  // else{
  //   var posts=getTumblrPosts(0)
  // }
  //res.json({data:posts})
  //var auth = getTumblrOAuth()
  //console.log("tumblr authorization returned : ",auth)
  //res.json({auth:auth})
})
app.get('/firebaseclientcredential',cors(),(req,res)=>{
  var clientFirebaseConfig = {
    apiKey: NODE_ENV.FIREBASE_API_KEY,
    authDomain: NODE_ENV.FIREBASE_AUTH_DOMAIN,
    databaseUrl:NODE_ENV.FIREBASE_DATABASE_URL,
    projectId: NODE_ENV.FIREBASE_PROJECT_ID,
    storageBucket: NODE_ENV.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: NODE_ENV.FIREBASE_MESSAGING_SENDER_ID,
    appId: NODE_ENV.FIREBASE_APP_ID,
    measurementId: NODE_ENV.FIREBASE_MEASUREMENT_ID,
  };
  res.send(clientFirebaseConfig)
})



app.get('/tumblr',function(req,res){
  // const getTumblrPostsClient=()=>{
          var array=[]
          const appConsumerKey = NODE_ENV.TUMBLR_OAUTH_CONSUMER_KEY
          const appConsumerSecret=NODE_ENV.TUMBLR_SECRET_KEY
          const authorizeUrl = 'https://www.tumblr.com/oauth/authorize';
          const requestTokenUrl = 'https://www.tumblr.com/oauth/request_token';
          const accessTokenUrl = 'https://www.tumblr.com/oauth/access_token';
          const oa = new OAuth(
              requestTokenUrl,
              accessTokenUrl,
              appConsumerKey,
              appConsumerSecret,
              '1.0A',
              'https://squwbs.com',
              'HMAC-SHA1'
          );
          oa.getOAuthRequestToken(function (err, token, secret) {
              if (err) {
              console.error('\tFailed with error getTumblrPosts', err);
              }
              console.log('\ttoken %s | secret %s', token, secret);
              var oauth={
                  consumer_key:appConsumerKey,
                  consumer_secret:appConsumerSecret,
                  token:token,
                  token_secret:secret,
              }
          
      
            var blog = new tumblr.Blog('gamutperiod.tumblr.com',oauth)
            blog.posts({limit:10,offset:0},function(err,response){
                if(err){
                    console.log(err)
                }
                for (var i =0; i<response.posts.length; i++){
                    if(response.posts[i].type=='video'){
                        if(response.posts[i].video!==undefined){
                            if(response.posts[i].video.youtube!==undefined){
                                array.push(
                                  {
                                      type:'video',
                                      url:response.posts[i].short_url,
                                      id:response.posts[i].id,
                                      time:response.posts[i].timestamp,
                                      video:response.posts[i].video.youtube.video_id
                                  }
                                )
                            }
                        }
                        
                    }                
                    if(response.posts[i].type=='photo'){
                        var photoList=[]
                        if(response.posts[i].image_permalink==undefined){
                            for(var j = 0; j<response.posts[i].photos.length; j++){
                                photoList.push(response.posts[i].photos[j].original_size.url)
                            }
                        }
                        else{
                            photoList.push(response.posts[i].image_permalink)
                        }
                        array.push(
                        {
                            type:'photo',
                            url:response.posts[i].short_url,
                            id:response.posts[i].id,
                            time:response.posts[i].timestamp,
                            photo:photoList
                        }
                        )
                    }
                    if(response.posts[i].type=='quote'){
                        array.push(
                        {
                            type:'quote',
                            url:response.posts[i].short_url,
                            id:response.posts[i].id,
                            time:response.posts[i].timestamp,
                            quote:response.posts[i].text
                        }
                        )
                    }
                    if(response.posts[i].type=='audio'){
                        array.push(
                        {
                            type:'audio',
                            url:response.posts[i].short_url,
                            id:response.posts[i].id,
                            time:response.posts[i].timestamp,
                            audio:response.posts[i].audio_url
                        }
                        )
                    }
                    if(response.posts[i].type=='text'){
                        array.push(
                        {
                            type:'text',
                            url:response.posts[i].short_url,
                            id:response.posts[i].id,
                            time:response.posts[i].timestamp,
                            text:response.posts[i].body
                        }
                        )
                    }
                    if(response.posts[i].type=='link'){
                        if(response.posts[i].link_image!==undefined){
                            array.push(
                            {
                                type:'link',
                                url:response.posts[i].short_url,
                                id:response.posts[i].id,
                                time:response.posts[i].timestamp,
                                link:response.posts[i].url,
                                image:response.posts[i].link_image
                            }
                            )
                        }
                        else{
                        array.push(
                            {
                            type:'link',
                            url:response.posts[i].short_url,
                            id:response.posts[i].id,
                            time:response.posts[i].timestamp,
                            link:response.posts[i].url,
                            image:undefined
                            }
                        )
                        }
                    }
                    if(response.posts[i].type=='chat'){
                        var chatList=[]
                        for (var j = 0; j<response.posts[i].dialogue.length;j++){
                            console.log(response.posts[i].dialogue[j].name+':'+response.posts[i].dialogue[j].phrase)
                            chatList.push(String(response.posts[i].dialogue[j].name)+' : '+String(response.posts[i].dialogue[j].phrase))
                        }
                        array.push(
                        {
                            type:'chat',
                            url:response.posts[i].short_url,
                            id:response.posts[i].id,
                            time:response.posts[i].timestamp,
                            url:response.posts[i].url,
                            chat:chatList
                        }
                        )
                    }  
                }
                console.log('this is the posts returned : ',stringifyObject(array,{
                  indent: ' ',
                  singleQuotes:false
                }))
                //return array
                res.json({posts:array})
            })
     
      })
  // }
  // const array = getTumblrPostsClient()
  // res.json({posts:array})
})

app.get('/readCookies',function(req, res){
  //res.send(req.signedCookies);
  res.json(req.signedCookies)
});
app.post('/readCookies',function(req, res){
  //res.send(req.signedCookies);
  res.json(req.signedCookies)
});
app.post('/subscribe',function(req,res){
  //get push subscription
  const subscription = req.body
  res.status(201).json({})
  const payload = JSON.stringify({title: 'push test'})
  webpush
  .sendNotification(subscription, payload)
  .catch((err)=>console.error(err))
})
app.post('/sendfcm',cors(),function(req,res){
  var message = req.body
  console.log("???????????????????")
  console.log(message)
  console.log("??????????????????")
  fcm.send(message,function(err,result){
    if(err){
      res.send({error:err})
    }
    else{
      res.send({message:result})
    }
  })
})
app.post('/sendfcmall',cors(),function(req,res){
  var message = req.body
  var ids=[]
  // message.registration_ids=[]
  var db = admin.database()
  var ref = db.ref('registerd')
  ref.once('value',function(snapshot){
    var subscribers=snapshot.val()
    //console,log('userlist function')
    if(subscribers!==undefined){
        // for (var i = 0; i<Object.keys(subscribers).length; i++){
        for (var i = 0; i<subscribers.length; i++){
          ids.push(subscribers[i].key)
        }
      }       
    })
  // message.registration_ids=ids
  // console.log("???????????????????")
  // console.log(message)
  // console.log("??????????????????")
  // fcm.send(message,function(err,result){
  //   if(err){
  //     res.send({error:err})
  //   }
  //   else{
  //     res.send({message:result})
  //   }
  // })
  for (var i =0; i<ids.length;i++){
    message.to=ids[i]
    fcm.send(message,function(err,result){
      if(err){
        console.log(err)
      }
      else{
        console.log(result)
      }
    })
  }
  
})
app.post('/sendNotification',cors(),function(req,res){
  const subscription = req.body.subscription
  const payload = req.body.payload
  const options={
    TTL:req.body.ttl
  }
  setTimeout(function() {
    webPush.sendNotification(subscription, payload, options)
    .then(function() {
      res.sendStatus(201);
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
  }, req.body.delay * 1000);
})
app.get('/vapidkey',cors(),function(req,res){
  //var key =urlBase64ToUint8Array(vapidKeys.publicKey)
  var key = vapidKeys.publicKey
  res.send({key:key})
})
app.post('/register',cors(),function(req,res){
  //maybe keep a list of subscription models here. but not now
  //res.sendStatus(201)
  console.log("!!!!!!!!!!!!!!!!!!!!!!!")
  console.log("register got -> ",req.body.token)
  console.log("!!!!!!!!!!!!!!!!!!!!!!!")
  var tokenStructure= {key:req.body.token}
  var db = admin.database()
  var ref = db.ref('registerd')
  ref.once('value',function(snapshot){
    var subscribers=snapshot.val()
    //console,log('userlist function')
    if(subscribers==undefined){
      subscribers={0:tokenStructure}
      var message = {
        
        collapse_key:'do_not_collapse',
        notification:{
          title:'Welcome to Squwbs',
          body:'Thank You For Your Permission'
        },
        to: req.body.token,
      }
      fcm.send(message,function(err,result){
        if(err){
          res.send({error:err})
        }
        else{
          res.send({message:result})
        }
      })
      
    }
    else{
      var picked = subscribers.find(subscriber=>subscriber.key==String(req.body.token))
      if(picked==undefined){
        subscribers.push(tokenStructure)
        var message = {
          to: req.body.token,
          collapse_key:'do_not_collapse',
          notification:{
            title:'Welcome to Squwbs',
            body:'Thank You For Your Permission'
          },
        }
        fcm.send(message,function(err,result){
          if(err){
            res.send({error:err})
          }
          else{
            res.send({message:result})
          }
        })
      }       
    }
    ref.set(subscribers,function(error){
      if(error){
        console.log(error)
        
      }
      else{
        console.log('callback fired')
      }

    })
  res.send(req.body.token)
})

})
app.post('/unregister',cors(),function(req,res){
  //maybe keep a list of subscription models here. but not now
  //res.sendStatus(201)
  console.log("!!!!!!!!!!!!!!!!!!!!!!!")
  console.log("unregister got -> ",req.body.token)
  console.log("!!!!!!!!!!!!!!!!!!!!!!!")
  var tokenStructure= {key:req.body.token}
  var db = admin.database()
  var ref = db.ref('registerd')
  ref.once('value',function(snapshot){
  var subscribers=snapshot.val()
  var picked = subscribers.findIndex(subscriber=>subscriber['key']==req.body.token)
  if(picked!==undefined){
    
    subscribers.splice(index,1)
  }       
  ref.set(subscribers,function(error){
    if(error){
      console.log(error)
    }
    else{
      console.log('callback fired')
    }
  })
  res.send(req.body.token)
})
})
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
app.get('/',cors(), function (req, res) {
  // res.locals.lang = 'en';
  // res.locals.name='template'
  let options = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: true,// Indicates if the cookie should be signed
    secret:'',
    secure:true,
    sameSite:true
}
  if(req.query.code != undefined){
    res.cookie('kakao_code',req.query.code,options)
  }
  console.log(req.signedCookies)
  if(req.signedCookies.name!==undefined)
  {
    console.log(req.signedCookies.name)
  }
  else{
    res.render(path.join(__dirname, 'build', 'index.html'));
  }
})
app.get('/squwbs_api',cors(),function(req,res){
  res.redirect('/')
})
app.get('/login',cors(), function (req, res) {
    res.redirect('/')
    //res.sendFile(path.join(__dirname, '../../build', 'index.html'));
    //res.render('login');
    // fs.readFile(path.join(__dirname, '../../build', 'index.html'),(err,data)=>{
    //   let htmlPlusData = data.toString().replace("MAPBOX_ACCESS_TOKEN_STRING",String(NODE_ENV.MAPBOX_ACCESS_TOKEN))
    //   res.send( htmlPlusData)
    // })
    //res.render('index',{ mapbox_access_token: NODE_ENV.MAPBOX_ACCESS_TOKEN })
  //});  
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
app.get('/home',cors(),function(req, res) {
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

app.get('/login/facebook',cors(),passport.authenticate('facebook',{ scope: ['email'] }));
app.get('/login/facebook/profile',cors(), passport.authenticate('facebook',{successRedirect:'/profile',failureRedirect:'/'}))
app.get('/login/google',cors(),passport.authenticate('google',{scope:['profile']}));

app.get('/login/google/profile',cors(),passport.authenticate('google',{failureRedirect:'/'}),function(req, res) {
  res.redirect('/profile');
});
app.get('/login/twitter',cors(),
  passport.authenticate('twitter')
);
app.get('/login/twitter/profile', passport.authenticate('twitter',{failureRedirect:'/'}),function(req, res) {
  res.redirect('/profile');
});
app.get('/kakao',cors(),function(req,res){
  
  // var headers = {
  //   'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  //     // 'Cache-Control':'no-cache'
  // }
  // var body = {}
  //   body.grant_type ='authorization_code'
  //   body.client_id=NODE_ENV.KAKAO_REST_API_KEY
  //   body.redirect_uri='https://squwbs-252702.appspot.com'
  //   body.code=req.query.code
  
  // fetch('https://kauth.kakao.com/oauth/token',{
  //     method:'post',
  //     headers:headers,
  //     body:JSON.stringify(body)
  // })

  // fetch(withQuery('https://kauth.kakao.com/oauth/token'),{
  //     headers:headers,
  //     grant_type :'authorization_code',
  //     client_id:'3f8eaabc9161b6f392c0999b7fce6026',
  //     redirect_uri:'https://squwbs-252702.appspot.com',
  //     //body.code = kakaoCode
  //     code:params[i].replace('code=','')
  // })
  var headers = {
    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    'Cache-Control':'no-cache'
  }
  var token= req.query.token
  var url = "https://kapi.kakao.com/v1/api/talk/friends"
  var bearer = 'Bearer '+token
  headers["Authorization"]=bearer
  fetch(url,{headers})

  .then((res)=>{
      return res.json()
  })
  .then((json)=>{
      res.send({json:json})
  })
  .catch((err)=>{
      //console.log('kakao.js 312 : ',err)
      res.send({error:err})
  })
  //res.send({code:req.query.code})
})
app.get('/kakaoadminkey',cors(),function(req,res){
  res.send({key:NODE_ENV.KAKAO_ADMIN_KEY})
})
app.post('pushregister',cors(),function(req,res){
  console.log('pushregister : ',req.body)
})
app.post('kakaopushregister',cors(),function(req,res){
  console.log('server.js 599 kakaopushregister : ',req.body)
  var headers = {
    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    'Cache-Control':'no-cache',
    'Authorization': 'KakaoAK '+req.body.key
  }
  fetch('https://kapi.kakao.com/v1/push/register',{
      headers:headers,
      method:"post",
      uuid:Math.floor(Math.random()*(Math.pow(2,63)-1)+1),
      device_id:uuidv4(),
      push_type:'gcm',
      push_token:req.body.token
  })
  .then((res)=>{
    return res.json()
  })
  .then((json)=>{
    console.log('initFirebase.js 109 : ',json)
    console.log('initFirebase 386 JSON TOKEN : ',json.access_token)

    
    
  })
})
app.get('/cards',cors(),function(req,res){
  res.redirect('/')
})
app.get('/PDF',cors(),function(req,res){
  res.redirect('/')
})
app.get('/sound',cors(),function(req,res){
  res.redirect('/')
})
app.get('/todo',cors(), function (req, res) {
  //res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  res.redirect('/')
});
app.get('/catalogue',cors(), function (req, res) {
  //res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  res.redirect('/')
});
app.get('/category', cors(),function (req, res) {
  //res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  res.redirect('/')
});
app.get('/product', cors(),function (req, res) {
  //res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  res.redirect('/')
});
app.get('/map', cors(),function (req, res) {
  res.redirect('/')
  //res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  //res.render('Map', { mapbox_access_token: NODE_ENV.MAPBOX_ACCESS_TOKEN });
  // fs.readFile(path.join(__dirname, '../../build', 'index.html'),(err,data)=>{
  //   let htmlPlusData = data.toString().replace("MAPBOX_ACCESS_TOKEN_STRING",String(NODE_ENV.MAPBOX_ACCESS_TOKEN))
  //   res.send( htmlPlusData)
  // })
  //res.render('index',{ mapbox_access_token: NODE_ENV.MAPBOX_ACCESS_TOKEN })
});
app.get('/desktop',cors(),function(req,res){
    res.status(301).redirect('https://bgamut.github.io/desktop/');
})
app.get('/profile',cors(),function(req, res){
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
    secret:'',
    secure:true,
    sameSite:true
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
    //res.cookie('SameSite','Lax')
    //console.log('411 : ',stringifyObject(req.user.photos))
    //res.cookie('photos',req.user.)
    res.redirect(url.format({
      pathname:"/"
    }))
    //res.redirect('https://squwbs.com');
  }
  
  
});
app.get('/logout',cors(),function(req,res){
  //req.logout()
  //req.signedCookies = null
  let options = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: true,// Indicates if the cookie should be signed
    secret:'',
    secure:true,
    sameSite:'strict'
  }
  
  //res.cookie('userName', undefined ,options);
  //res.cookie('providerid',undefined,options)
  //res.cookie('provider',undefined,options)
  if (req.signedCookies.firebaseToken!=undefined){
    admin.messaging().unsubscribeFromTopic(req.signedCookies.firebaseToken,'chat')
    .then(function(res){
      console.log('successfully unsubscribed from chat', res)
    })
    .catch(function(err){
      console.log('error unsubscribing from topic : ',err )
    })
  }
  res.clearCookie('userName')
  res.clearCookie('providerid')
  res.clearCookie('provider')
  res.clearCookie('photo')
  res.clearCookie('firebaseToken')
  res.redirect('/')
})
app.get('/download',cors(),function(req,res){
  res.download(__dirname+'/squwbs.zip')
})
app.get('/downloadpro',cors(),function(req,res){
  res.download(__dirname+'/squwbs_pro.zip')
})
app.get('/info',cors(),function(req,res){
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
    //userStructure.token=global[tempUUID]['connect.sid']
    userStructure.token=global[tempUUID].token
    soldItemsStructure.owner=userStructure
    if(global[tempUUID].itemList!=undefined&&global[tempUUID].itemList!=null){
      for(var i =0; i<global[tempUUID].itemList.length; i++){
        soldItemsStructure.items.push(global[tempUUID].itemList[i])
      }
    }
    
    if(global[tempUUID].uuid!=undefined&&global[tempUUID].uuid!=null){
    //soldItemsStructure.uuid=global[tempUUID].uuid
      soldItemsStructure.uuid=uuidv4()
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
        var storeHistory = admin.firestore().doc('data/users/'+String(global[tempUUID].provider)+'/'+String(global[tempUUID].providerid))
        //console.log('server.js 626 admin.firestore',admin.firestore)
        //console.log('server.js 627 admin.firestore.Firestore',admin.firestore.Firestore)
        
        storeHistory.set(soldItemsStructure)
        .then((data)=>{
          console.log('firestore function fired')
          console.log(data)
        })
        .catch(err=>{
          console.log(err)

        })
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
app.get('/removeme',cors(),function(req,res){
  //var obj = req.signedCookies
  var obj = req.query
  console.log('/removeme obj: ',stringifyObject(obj))
  //var obj = req.query

  //function addUser({userName,userEmail},func){
  function removeuser(obj,func){
    //var copy = Object.create(obj)

    //global.copy = Object.create(obj)
    //const tempUUID = uuidv4()
    //global[tempUUID] = Object.create(obj)

    //console.log(stringifyObject(global[tempUUID]))
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
        //var picked = usersList.find(user=>user.owner.provider[global[tempUUID].provider]==global[tempUUID].providerid)
        var picked = usersList.find(user=>user.owner.provider[obj.provider]==obj.providerid)
    
        if(picked==undefined){
          //usersList.push(userStructure)
          console.log('no such user to remove')
        }
        else{
          //var index=usersList.findIndex(user=>user.owner.provider[global[tempUUID].provider]==global[tempUUID].providerid)
          var index=usersList.findIndex(user=>user.owner.provider[obj.provider]==obj.providerid)
          
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
      //delete global[tempUUID]
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

// app.post('/linewebhook'
//         ,
//         [
//           cors(),
//           linemiddleware({
//               channelAccessToken:"JGMd3CQl+ouQjxwCR1LluhuclDFMiUdKqVXq8nrJmHk8BpHWiraHqSiie6QW3qKdcaCEo+Hc4SctGP3jfkLhnwCbEM7nwDOwnRX4gImAgWisQlBy1oo4NaBAeQk2MYNO/L9kA3OBUAVDIqBX6zg75QdB04t89/1O/w1cDnyilFU=",
//               channelSecret:"73354a544d842dfaf3bd347203eef7f6"
//             })
//         ]
//         ,
//         (req,res)=>
//           {
//             // console.log(stringifyObject(req.body))
//             // res.json(req.body)
//             // .then(()=>{
//             //   console.log("then")
//             // }).catch((error)=>{
//             //   console.log('error')
//             // })
//             //res.send(req.query)
//             //res.json(req.body.events)
//             //res.json(req.body.destination) //user id of the bot
//             Promise
//             .all(req.body.events.map(handleEvent))
//             .then((result) => res.json(result))
//             .catch((err) => {
//               console.error(err);
//               res.status(500).end();
//             });
//           }
// )
// app.post('/firebaseToken',cors(),(req,res)=>{
//   //res.send(req.body)
 
//   let options = {
//     maxAge: 1000 * 60 * 15, // would expire after 15 minutes
//     httpOnly: true, // The cookie only accessible by the web server
//     signed: true,// Indicates if the cookie should be signed
//     secret:''
// }
//   //todo register token to list of devices
//   console.log('firebaseToken received', stringifyObject(req.body.token))
//   res.cookie('firebaseToken', req.body.token ,options);
//   //res.json({token:req.body.token})
// })
app.get('/firebaseMessage',cors(),(req,res)=>{
  // function getGoogleAccessToken(){
  //   return new Promise(function(resolve, reject) {
  //     var key = require('./service-account.json');
  //     var jwtClient = new google.auth.JWT(
  //       key.client_email,
  //       null,
  //       key.private_key,
  //       SCOPES,
  //       null
  //     );
  //     jwtClient.authorize(function(err, tokens) {
  //       if (err) {
  //         reject(err);
  //         return;
  //       }
  //       resolve(tokens.access_token);
  //     });
  //   });
  // }
  // getGoogleAccessToken()
  // .then((accessToken)=>{
  //   var message=req.query.message
  //   var topic = req.query.topic
  //   var payload = {
  //     data:{
  //       message:message
  //     },
  //     topic:topic
  //     // token:NODE_ENV.FIREBASE_KEY_PAIR
  //   }
  //   //admin.messaging().send(payload)
  //   admin.messagingToTopic(topic,payload)
  //     .then((response)=>{
  //       res.send({success:response, payload:payload})
  //     })
  // })
  // .catch((err)=>{
  //   res.send({error:err})
  // })
  var message=req.query.message
  
  if (chatHistory.length>=100){
    chatHistory.splice(0,1)
  }
  chatHistory.push(message)
  var topic = req.query.topic
  var payload = {
    // data:{
    //   message:message
    // },
    notification:{
      title:'test title from server.js',
      body:message
    }
    //topic:topic
    // token:NODE_ENV.FIREBASE_KEY_PAIR
  }
  //admin.messaging().send(payload)
  admin.messaging().sendToTopic(topic,payload)
 
    .then((response)=>{
      res.send({success:response, payload:payload})
      console.log('messaging successful', response)
    })
    .catch((err)=>{

      res.send({error:err})
      console.log('error messaging')
    })

})
app.get('/firebaseclientcredential',cors(),(req,res)=>{
  var clientFirebaseConfig = {
    apiKey: NODE_ENV.FIREBASE_API_KEY,
    authDomain: NODE_ENV.FIREBASE_AUTH_DOMAIN,
    databaseUrl:NODE_ENV.FIREBASE_DATABASE_URL,
    projectId: NODE_ENV.FIREBASE_PROJECT_ID,
    storageBucket: NODE_ENV.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: NODE_ENV.FIREBASE_MESSAGING_SENDER_ID,
    appId: NODE_ENV.FIREBASE_APP_ID,
    measurementId: NODE_ENV.FIREBASE_MEASUREMENT_ID,
  };
  res.send(clientFirebaseConfig)
})
// app.get('/fccapikey',(req,res)=>{
//   var clientFirebaseConfig = {
//     apiKey: NODE_ENV.FIREBASE_API_KEY,
//     // authDomain: NODE_ENV.FIREBASE_AUTH_DOMAIN,
//     // databaseUrl:NODE_ENV.FIREBASE_DATABASE_URL,
//     // projectId: NODE_ENV.FIREBASE_PROJECT_ID,
//     // storageBucket: NODE_ENV.FIREBASE_STORAGE_BUCKET,
//     // messagingSenderId: NODE_ENV.FIREBASE_MESSAGING_SENDER_ID,
//     // appId: NODE_ENV.FIREBASE_APP_ID,
//     // measurementId: NODE_ENV.FIREBASE_MEASUREMENT_ID,
//   };
//   res.send(clientFirebaseConfig)
// })
// app.get('/fccauthdomain',(req,res)=>{
//   var clientFirebaseConfig = {
//     //apiKey: NODE_ENV.FIREBASE_API_KEY,
//     authDomain: NODE_ENV.FIREBASE_AUTH_DOMAIN,
//     // databaseUrl:NODE_ENV.FIREBASE_DATABASE_URL,
//     // projectId: NODE_ENV.FIREBASE_PROJECT_ID,
//     // storageBucket: NODE_ENV.FIREBASE_STORAGE_BUCKET,
//     // messagingSenderId: NODE_ENV.FIREBASE_MESSAGING_SENDER_ID,
//     // appId: NODE_ENV.FIREBASE_APP_ID,
//     // measurementId: NODE_ENV.FIREBASE_MEASUREMENT_ID,
//   };
//   res.send(clientFirebaseConfig)
// })
// app.get('/fccdatabaseurl',(req,res)=>{
//   var clientFirebaseConfig = {
//     //apiKey: NODE_ENV.FIREBASE_API_KEY,
//     //authDomain: NODE_ENV.FIREBASE_AUTH_DOMAIN,
//     databaseUrl:NODE_ENV.FIREBASE_DATABASE_URL,
//     // projectId: NODE_ENV.FIREBASE_PROJECT_ID,
//     // storageBucket: NODE_ENV.FIREBASE_STORAGE_BUCKET,
//     // messagingSenderId: NODE_ENV.FIREBASE_MESSAGING_SENDER_ID,
//     // appId: NODE_ENV.FIREBASE_APP_ID,
//     // measurementId: NODE_ENV.FIREBASE_MEASUREMENT_ID,
//   };
//   res.send(clientFirebaseConfig)
// })
// app.get('/fccprojectid',(req,res)=>{
//   var clientFirebaseConfig = {
//     //apiKey: NODE_ENV.FIREBASE_API_KEY,
//     //authDomain: NODE_ENV.FIREBASE_AUTH_DOMAIN,
//     //databaseUrl:NODE_ENV.FIREBASE_DATABASE_URL,
//     projectId: NODE_ENV.FIREBASE_PROJECT_ID,
//     // storageBucket: NODE_ENV.FIREBASE_STORAGE_BUCKET,
//     // messagingSenderId: NODE_ENV.FIREBASE_MESSAGING_SENDER_ID,
//     // appId: NODE_ENV.FIREBASE_APP_ID,
//     // measurementId: NODE_ENV.FIREBASE_MEASUREMENT_ID,
//   };
//   res.send(clientFirebaseConfig)
// })
// app.get('/fccstorageucket',(req,res)=>{
//   var clientFirebaseConfig = {
//     //apiKey: NODE_ENV.FIREBASE_API_KEY,
//     //authDomain: NODE_ENV.FIREBASE_AUTH_DOMAIN,
//     //databaseUrl:NODE_ENV.FIREBASE_DATABASE_URL,
//     //projectId: NODE_ENV.FIREBASE_PROJECT_ID,
//     storageBucket: NODE_ENV.FIREBASE_STORAGE_BUCKET,
//     // messagingSenderId: NODE_ENV.FIREBASE_MESSAGING_SENDER_ID,
//     // appId: NODE_ENV.FIREBASE_APP_ID,
//     // measurementId: NODE_ENV.FIREBASE_MEASUREMENT_ID,
//   };
//   res.send(clientFirebaseConfig)
// })
// app.get('/fccmessagingsenderid',(req,res)=>{
//   var clientFirebaseConfig = {
//     //apiKey: NODE_ENV.FIREBASE_API_KEY,
//     //authDomain: NODE_ENV.FIREBASE_AUTH_DOMAIN,
//     //databaseUrl:NODE_ENV.FIREBASE_DATABASE_URL,
//     //projectId: NODE_ENV.FIREBASE_PROJECT_ID,
//     //storageBucket: NODE_ENV.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: NODE_ENV.FIREBASE_MESSAGING_SENDER_ID,
//     // appId: NODE_ENV.FIREBASE_APP_ID,
//     // measurementId: NODE_ENV.FIREBASE_MEASUREMENT_ID,
//   };
//   res.send(clientFirebaseConfig)
// })
// app.get('/fccappid',(req,res)=>{
//   var clientFirebaseConfig = {
//     //apiKey: NODE_ENV.FIREBASE_API_KEY,
//     //authDomain: NODE_ENV.FIREBASE_AUTH_DOMAIN,
//     //databaseUrl:NODE_ENV.FIREBASE_DATABASE_URL,
//     //projectId: NODE_ENV.FIREBASE_PROJECT_ID,
//     //storageBucket: NODE_ENV.FIREBASE_STORAGE_BUCKET,
//     //messagingSenderId: NODE_ENV.FIREBASE_MESSAGING_SENDER_ID,
//     appId: NODE_ENV.FIREBASE_APP_ID,
//     // measurementId: NODE_ENV.FIREBASE_MEASUREMENT_ID,
//   };
//   res.send(clientFirebaseConfig)
// })
// app.get('/fccmeasurementid',(req,res)=>{
//   var clientFirebaseConfig = {
//     //apiKey: NODE_ENV.FIREBASE_API_KEY,
//     //authDomain: NODE_ENV.FIREBASE_AUTH_DOMAIN,
//     //databaseUrl:NODE_ENV.FIREBASE_DATABASE_URL,
//     //projectId: NODE_ENV.FIREBASE_PROJECT_ID,
//     //storageBucket: NODE_ENV.FIREBASE_STORAGE_BUCKET,
//     //messagingSenderId: NODE_ENV.FIREBASE_MESSAGING_SENDER_ID,
//     //appId: NODE_ENV.FIREBASE_APP_ID,
//     measurementId: NODE_ENV.FIREBASE_MEASUREMENT_ID,
//   };
//   res.send(clientFirebaseConfig)
// })

app.get('/firebaseToken',cors(),(req,res)=>{
  //res.send(req.body)
 
  let options = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: true,// Indicates if the cookie should be signed
    secret:'',
    secure:true,
    sameSite:true
}
  //todo register token to list of devices
  //console.log('get firebaseToken body', stringifyObject(req.body.token))
  console.log('get firebaseToken query', stringifyObject(req.query))
  var deviceTokens=[]
  deviceTokens.push(req.query.token)
  
  admin.messaging().subscribeToTopic(deviceTokens,'chat')
    .then(function(result){
      console.log('server.js 826 Successfully subscribed to topic:', result);
      //res.json({result:result})
    })
    .catch(function(err){
      console.log('server.js 829 error subscribing to topic:',err)
    })
  res.cookie('firebaseToken', req.query.token ,options);
  
})
// app.get('/linesendmessage',cors(),(req,res)=>{
//   //console.log('682:',stringifyObject(req.query.text))
//   client.pushMessage(
//     NODE_ENV.LINE_MY_USER_ID,
//     {
//       type:'text',
//       text:req.query.text
//     }
//     )
//     .then(()=>{
//       res.send(
//         {message:'message sent'}
//       )
//     })
//     .catch((err)=>{
//       res.send({error:err})
//     })

// })
// app.get('/linegetmessage',cors(),(req,res)=>{
//   var headers = {"Content-Type": "application/json",
//             "Access-Control-Allow-Origin": "*",
//             mode:'cors'
//         };
//   var token = NODE_ENV.LINE_CHANNEL_ACCESS_TOKEN
//   var bearer = 'Bearer' +token
//   headers["Authorization"]=bearer
//   fetch('https://api.line.me/v2/bot/message/{messageId}/content', {
//       headers
//   })
//   .then(result=>{
//       //setContent({...content,...result.message})
//       console.log('143:',stringifyObject(result.json()))
//   })
//   .catch((err)=>{
//       console.error(err)
//   })
//   //console.log('701:',stringifyObject(req.query.text))
//   // client.getMessageContent(NODE_ENV.LINE_MY_USER_ID)
//   //   .then((stream)=>{
//   //     stream.on('data',(chunk)=>{
//   //       res.send(
//   //         {message:chunk}
//   //       )
//   //     })
//   //     stream.on('data',(err)=>{
//   //       console.log(err)
//   //       //res.send({error:err})
//   //     })
//   //   })
//   //   .catch((err)=>{
//   //     console.log(err)
//   //     //res.send({error:err})
//   //   })

// })
app.get('/mongouri',cors(),(req,res)=>{
  //console.log(NODE_ENV.MAPBOX_ACCESS_TOKEN)
  res.send({"mongouri":NODE_ENV.MONGO_URI})

})
// app.get('/line',cors(),(req,res)=>{
//   res.send({
//     'token':NODE_ENV.LINE_CHANNEL_ACCESS_TOKEN,
//     'id':NODE_ENV.LINE_MY_USER_ID
//   })
// })
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
// app.get('/service-worker.js',(req,res)=>{
//   res.sendFile(path.join(__dirname,'../../build','service-worker.js'))
// })
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

// app.get('/addwordtomongo',cors(),(req,res)=>{
//   var obj = req.query
//   function addWordToMongo({word,meaning,example,pronunciation},callback){
//     fetch(mongourlStringExpress, {
//         credentials: "include"
//       })
//     .then(function(result){
//       return result.json()
//     })
//     .then(function(json){      
//       //mongouri=jsongmongouri
//       var mongouri=json.mongouri
//       console.log(mongouri)
//       mongoose.connect(mongouri,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
//       .catch((err)=>{
//         console.log(err)
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
//         const Card = mongoose.model('Cards',CardSchema)
//         Card.findOne({word:word},function(err,obj){
//           console.log(obj)
//           const newCard = new Card({
//             word:word,
//             meaning:meaning,
//             example:example,
//             pronunciation:pronunciation,
//           })
//           if(obj!==null){
//             Card.findOneAndRemove(
//               {"word":word },{useFindAndModify:false},function(){
//                 console.log('findOneAndRemove() function fired')
//               }
//             );
            
//           }
//           newCard.save()
//           Card.updateOne(
//             { omitUndefined: true },
//             newCard
//           );
//           callback('successfully added '+word)

//         })
        

        
//       })
//     })
//     .catch((err)=>{
//       console.log(err)
//     })
//   }

//   function sendSuccess(message){
//     res.json({message:message})
//   }
//   addWordToMongo(obj,sendSuccess)
  
// })
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
// app.get('/getwordlistfrommongo',cors(),(req,res)=>{
//   var wordList = req.query.list
  
//   const getWordList =(wordList,mongouri,callback)=>{
//     //const ObjectId=uuidv4()
//     callbackList=[]
//     mongoose.connect(mongouri,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true })
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
//         var Card = mongoose.model('Cards',CardSchema)
//         // for (var i=0; i<wordList.length; i++){
//         Card.find({})
//         .then(function(result){
//           var list=[]
//           for (var i =0; i<result.length; i++){
//             list.push(result[i]._doc)
//           }
//           callback({data:list})
//         })
//         .then(function(){
//           db.close()
//         })
//         //return Card.find({})
  
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
//     getWordList(wordList,json.mongouri,sendObj)
//   })
//   .catch(function(err){
//     sendObj({error:err})
//   })
  
// })
app.get('/saysomething',cors(),(req,res)=>{
  var obj = req.query
  var cookies= req.signedCookies
  console.log('server 1777:', cookies)
  function saysomething(chatInput,cookies){
    
    global.chatHistory.push(
      {
        userProvider:cookies.provider,
        userProviderID:cookies.providerid,
        chat:chatInput.message,
      }
    )

    // var db = admin.database()
    // var ref = db.ref('chat')
    // ref.once('value',function(snapshot){
    //     var chathistory=snapshot.val()
    //     console.log(chathistory)
    //     if(chathistory==undefined){
    //         chathistory={0:
    //           {
    //             userProvider:cookies.provider,
    //             userProviderID:cookies.providerid,
    //             chat:chatInput.message,
    //           }
    //         }
    //     }
    //     else{
    //         chathistory.push(
    //                           {
    //                             userProvider:cookies.provider,
    //                             userProviderID:cookies.providerid,
    //                             chat:chatInput.message,
    //                           }
    //                         )
    //     }
    //     // global.chatHistory.push(
    //     //   {
    //     //     userProvider:cookies.provider,
    //     //     userProviderID:cookies.providerid,
    //     //     chat:chatInput.message,
    //     //   }
    //     // )
    //     //global.chatHistory=chathistory
    //     ref.set(chathistory,function(error){
    //       if(error){
    //         console.log(error)
    //         res.setHeader('Content-Type','application/json')
    //         //res.send({message:message})
    //         //func(error)
    //         //func(error)
    //         res.send({message:error})
    //       }
    //       else{
    //         console.log('callback fired in /saysomething')
    //         //func(words)
    //         //res.setHeader('Content-Type','application/json')
    //         //res.send({message:message})
    //         res.send({
    //           message:global.chatHistory
    //         })
    //       }

    //     })
    // })
}
  function sendSuccess(object){
  if (chatHistory.length>=100){
    chatHistory.splice(0,1)
  }
    console.log(object)
    chatHistory.push(object)
    console.log(chatHistory)
    res.send(object)
}
  saysomething(obj,cookies,sendSuccess)
  
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
    fetch(withQuery('https://squwbs-252702.appspot.com/api'
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
app.get('/socket.io',cors(),(req,res)=>{
  const timestamp=new Date()
  res.send({time:timestamp,chatHistory:global.chatHistory})

  //console.log('server.js 1806 : ', req.query)
})
app.post('/socket.io',cors(),(req,res)=>{
  const timestamp=new Date()
  res.send({time:timestamp,chatHistory:global.chatHistory})
  //console.log('server.js 1806 : ', req.query)
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

