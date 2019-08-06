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
const path = require('path');
const fs =require('fs')
var cookieParser = require('cookie-parser')
var mobileDetect = require('mobile-detect')
var admin = require('firebase-admin')
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
  credential:admin.credential.cert(serviceKey),
  databaseURL:config.databaseURL
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
    ,profileFields: ['id', 'email', 'gender', 'link','locale','name','timezone','updated_time','verified','displayName']
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
// require('express-engine-jsx').attachTo(app, {
//   cache: path.join(__dirname, 'cache'), // required and should be absolute path to cache dir for compiled js files
//   views: path.join(__dirname, 'views'), // required and should be absolute path to views dir with jsx files
//   doctype: "<!DOCTYPE html>\n"   // optional and this is default value
// });
app.set('views', __dirname + '/views');
//app.set('view engine','jsx')
app.engine('jsx',require('express-react-views').createEngine())
//app.set('view engine','ejs')
//app.use(require('cookie-parser')());
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
app.use(allowCrossDomain);
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
// });
var allowedOrigins = [
                      'http://squwbs.herokuapp.com',
                      'https://squwbs.herokuapp.com/'
                    ];
app.get('/cookies',cors(),(req,res)=>{

  //res.send(req.signedCookies)
  let options = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: true,// Indicates if the cookie should be signed
    secret:''
}
  res.cookie('name', 'bernard',options);
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
  
  //res.render(path.join(__dirname, 'src', 'components','NoMatch.js'),{name:'Tobi'})
});
app.get('/home',
  function(req, res) {
    if(req.user==undefined){
      res.render('home', { user: undefined });
    }
    else{
      res.render('home', { user: req.user.displayName });
    }
    
  });

app.get('/login',
  function(req, res){
    res.locals.lang = 'en';
    res.locals.name='template'
    if(req.user==undefined){
      res.render('login');
    }
    else{
      res.redirect('/profile')
    }
  });

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
  }
  else{
    res.cookie('userName', req.user.displayName ,options);
    res.cookie('providerid',req.user.id,options)
    res.cookie('provider',req.user.provider,options)
    res.redirect(url.format({
      pathname:"/"
    }))
  }
  
  
});
app.get('/logout',function(req,res){
  req.logout()
  res.redirect('/')
})

//app.options('*', cors())
//var corsOptions = {origin:'https://squwbs.herokuapp.com/'}
app.get('/mapboxtoken',cors(),(req,res)=>{
  //console.log(NODE_ENV.MAPBOX_ACCESS_TOKEN)
  res.send({"MAPBOX_ACCESS_TOKEN":NODE_ENV.MAPBOX_ACCESS_TOKEN})

})
app.get('/api',cors(),(req,res)=>{
  
  res.send(req.query)

})

app.post('/api',cors(),(req,res)=>{

  res.send(req.body)
  
})
app.get('/firebaseAddUser',cors(),(req,res)=>{
  var obj = req.query
  // admin.initializeApp({
  //   credential:admin.credential.cert(serviceKey),
  //   databaseURL:config.databaseURL
  // })
  this.db = admin.database()
  this.ref = this.db.ref('restricted_access')
  function addUser({userName,userEmail}){
    this.ref.once('value',function(snapshot){
      var users=(snapshot.val().users)
      users.push({userName,userEmail})
      console.log(users)
      var usersRef=this.ref.child('users')
      usersRef.set(users)
    })
    // admin.database().goOffline()
  }
  addUser(obj)

})
app.get('/firebaseGetUser',cors(),(req,res)=>{
  var obj = req.query
  // admin.initializeApp({
  //   credential:admin.credential.cert(serviceKey),
  //   databaseURL:config.databaseURL
  // })
  this.db = admin.database()
  this.ref = this.db.ref('restricted_access')
  
  function getUser(userEmail){
    this.ref.once('value',function(snapshot){
    var users=(snapshot.val().users)
    var picked = users.find(array=>array.userEmail==userEmail)
    console.log('found user data ' + 
      stringifyObject(picked, {
        indent: '  ',
        singleQuotes: false
      })
    )
    // admin.database().goOffline()
    return(picked)
            
    })
  }
  getUser(obj.userEmail)

})
app.get('/firebaseUpdateUserData',cors(),(req,res)=>{
  var obj = req.query
  // admin.initializeApp({
  //   credential:admin.credential.cert(serviceKey),
  //   databaseURL:config.databaseURL
  // })
  this.db = admin.database()
  this.ref = this.db.ref('restricted_access')

  function updateUserData(userEmail,dataName,data){
    this.ref.once('value',function(snapshot){
      var users=(snapshot.val().users)
      var picked = users.find(array=>array.userEmail==userEmail)
      picked[dataName]=data
      console.log('updated user data '+
      stringifyObject(picked, {
          indent: '  ',
          singleQuotes: false
      }))
      users[users.indexOf(picked)]=picked
      var usersRef=this.ref.child('users')
      usersRef.set(users)
    })
    
  }
  for(var i = 0; i<Object.keys(obj);i++){
    if(obj[Object.keys(obj)[i]]!=userEmail){
      updateUserData(obj.userEmail,Object.keys(obj)[i],obj[Object.keys(obj)[i]])
    }
  }
  // admin.database().goOffline()
})
app.get('/firebaseDeleteUser',cors(),(req,res)=>{
  var obj = req.query
  // admin.initializeApp({
  //   credential:admin.credential.cert(serviceKey),
  //   databaseURL:config.databaseURL
  // })
  this.db = admin.database()
  this.ref = this.db.ref('restricted_access')

  function deleteUser(userEmail){
    this.ref.once('value',function(snapshot){
      var users=(snapshot.val().users)
      var picked = users.find(array=>array.userEmail==userEmail)
      console.log(UserEmail + 'removed')
      users.splice(users.indexOf(picked),1)
      var usersRef=this.ref.child('users')
      usersRef.set(users)
    })
    // admin.database().goOffline()
  }
  deleteUser(obj.userEmail)
})
app.get('/firebaseAddWord',cors(),(req,res)=>{
  var obj = req.query
  // admin.initializeApp({
  //   credential:admin.credential.cert(serviceKey),
  //   databaseURL:config.databaseURL
  // })
  this.db = admin.database()
  this.ref = this.db.ref('restricted_access')

  function addWord({word,meaning,example}){
    //wordDeck needs to be an array [{word,meaning,example}...]
    this.ref.once('value',function(snapshot){
      var words=(snapshot.val().words)
      words.push({word,meaning,example})
      var wordsRef=this.ref.child('words')
      wordsRef.set(words)
    })
    // admin.database().goOffline()
  }
  addWord(obj)
})
    
  
  

app.get('/ebay',cors(),(req,res)=>{

    fetch(withQuery('https://squwbs.herokuapp.com/api'
    ,req.query
    ))
    .then(resulst=>{
      return resulst.json()
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
  
console.log('server started in port number : '+String(portnumber))
app.listen(process.env['PORT'] || portnumber);


}

