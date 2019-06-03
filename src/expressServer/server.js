var NODE_ENV = require('./config');
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
module.exports.expressServer = function (portnumber){
if (process.env.DYNO) {
  trustProxy = true;
}
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

app.set('views', __dirname + '/views');
app.set('view engine','jsx')
app.engine('jsx',require('express-react-views').createEngine())

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());
app.use(require('express-session')({ secret: 'keyboard cat',resave:true,saveUninitialized:true }));
app.use(express.static(path.join(__dirname, '../../build')));
app.use(express.static(path.join(__dirname, 'html/*/*')));
app.use(passport.initialize());
app.use(passport.session());


// Define routes.
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

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/todo', function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});


app.get('/profile',

  function(req, res){
  if(req.user==undefined){
    res.redirect(url.format({
      pathname:"/"
  })) 

  }

  else{

    res.render('profile', { 
      provider:req.user.provider,
      id:req.user.id,
      displayName:req.user.displayName,

    });
  }

     
});
app.get('/logout',function(req,res){
  req.logout()
  res.redirect('/')
})
app.get('/api',cors(),(req,res)=>{

  res.send(req.query)

})
app.post('/api',cors(),(req,res)=>{

  res.send(req.body)
  
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

  
console.log('server started in port number : '+String(portnumber))
app.listen(process.env['PORT'] || portnumber);


}