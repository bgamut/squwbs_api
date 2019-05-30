//require('dotenv').config();
var NODE_ENV = require('./config');
var express = require('express');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var FBStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy
//var GooglePlusTokenStrategy = require('passport-google-plus-token')
const cookieSession = require('cookie-session')
const cors = require('cors')
const url = require('url'); 
const { URLSearchParams } = require('url'); 
const fetch = require('node-fetch')
var trustProxy = false;
console.log(NODE_ENV)
if (process.env.DYNO) {
  // Apps on heroku are behind a trusted proxy
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
    ,passReqToCallback : true
    ,profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
    ,enableProof: true
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


// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');
app.set('view engine','jsx')
app.engine('jsx',require('express-react-views').createEngine())

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
//app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());
app.use(require('express-session')({ secret: 'keyboard cat',resave:true,saveUninitialized:true }));
//app.use(cookieSession({maxAge:24*60*60*1000,keys:['encripteddetpircne']}))


// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// Define routes.
app.get('/',
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
    // console.log(req.user)
    if(req.user==undefined){
      res.render('login');
    }
    else{
      res.redirect('/profile')
    }
  });

app.get('/login/facebook',
  passport.authenticate('facebook'
  ,{ scope: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'] }
  
  ));
app.get('/login/facebook/profile', function(req, res) {
  passport.authenticate('facebook',{failureRedirect:'/login'})
  ,function(req, res) {
    res.redirect('/profile');
  }
})
app.get('/login/google',
  passport.authenticate('google'
    ,{scope:['profile']}
  ));
// app.get('/login/google/profile',
//   passport.authenticate('google',{failureRedirect:'/login'}),
//   function(req,res){
//   // req.session.save(()=>{
//   //   res.redirect('/profile')
//   // })

//   // req.session.save(()=>{
//   //   console.log(req.user)
//   //   res.redirect('/profile')
//   // })  

//   res.redirect('/profile')
// });
app.get('/login/google/profile',  
  passport.authenticate('google',{failureRedirect:'/login'}),
  function(req, res) {
  res.redirect('/profile');
});
app.get('/login/twitter',
  passport.authenticate('twitter')
);
app.get('/login/twitter/profile', 
  //passport.authorize('twitter')
  passport.authenticate('twitter',{failureRedirect:'/login'}),
  function(req, res) {
  // req.session.save(()=>{
  //   res.redirect('/profile');
  // })
  res.redirect('/profile');
});





app.get('/profile',
  //passport.authenticate('google'),
  //require('connect-ensure-login').ensureLoggedIn('/'),
  
  function(req, res){
  if(req.user==undefined){
    console.log(req.profile)
    es.redirect(url.format({
      pathname:"/",
      query: req.profile
  })) 
    //res.redirect('/login')
  }
  // console.log(res.query)  
  // console.log(req)  
  else{
    //res.send(req)
    res.render('profile', { 
      provider:req.user.provider,
      id:req.user.id,
      displayName:req.user.displayName,
      //email:req.user.emails[0].value,
      picture:req.user.photos[0].value
    });
  }

     
});
app.get('/logout',function(req,res){
  req.logout()
  res.redirect('/')
})
app.get('/api',cors(),(req,res)=>{
    

  res.redirect(url.format({
      pathname:"/",
      query: req.query
  })) 
})
app.post('/api',cors(),(req,res)=>{


  res.redirect(url.format({
      pathname:"/",
      query: req.body
  })) 
  
})
app.get('/ebay',cors(),(req,res)=>{
    data={name:'ck'}
    const params = new URLSearchParams()
    params.append('a','1')
    fetch("https://squwbs.herokuapp.com/api",{
    method: "POST",
    body: params,
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"})
    .then(function(response){
    // response.status     //=> number 100–599
    // response.statusText //=> String
    // response.headers    //=> Headers
    // response.url        //=> String
    //return response.url()
    return response.text() 
    }, function(error){
      console.log(error.message)
    })
})
  // function(req,res){
  //   console.log(req.headers.cookie)
  // })
  

app.listen(process.env['PORT'] || 8080);
