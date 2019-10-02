//import { EventEmitter } from "events";

var firebaseConfig = {
    messagingSenderId:'404719977912'
    ,apiKey:'AIzaSyA9VVBgegATYGan6PGuvCjsuG0JL2OIX14'
    ,authDomain:'assistant-569a2.firebaseapp.com'
    ,databaseURL:'https://assistant-569a2.firebaseio.com'
    ,projectId:'assistant-569a2'
    ,storageBucket:'assistant-569a2.appspot.com'
    ,appId:'1:404719977912:web:04d0a42a3242d6c2'
  };

//custom event definitions
const firebaseTokenReceived =(message)=> {
  return(
    new CustomEvent(
      "firebaseTokenReceived", 
      {
        detail: {
          message: message,
          time: new Date(),
        },
        bubbles: true,
        cancelable: true
      }
    )
  )
}

const firebaseMessageReceived =(message)=> {
  return(
    new CustomEvent(
      "firebaseMessageReceived", 
      {
        detail: {
          message: message,
          time: new Date(),
        },
        bubbles: true,
        cancelable: true
      }
    )
  )
}

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging()
document.firebaseMessaging=messaging
console.log("this is firebase in action",messaging)
messaging.requestPermission()
.then(()=>{
  console.log('permission granted')
  return messaging.getToken()

}).then(function(token){
  console.log('push token : ',token)
  //event listener need to be implemented in the react code
  document.dispatchEvent(firebaseTokenReceived(token))
  var headers = {"Content-Type": "application/json"};

  var body={}
  var url = 'https://squwbs.herokuapp.com/firebaseToken'
  body.token=token
  //console.log(body)
  fetch(url,{
    method:"post",
    mode:'cors',
    body:body
  }).then((res)=>{
    return res.json();
  })
  .then(()=>{
    fetch('https://squwbs.herokuapp.com/readCookies')
    .then(res=>{
      return res.json()
    }).then((json)=>{
      console.log(json)
    })
    //console.log()
  })
  .catch((err)=>{
    console.log(err)
  })
})

.catch((e)=>{
  console.log('permission denied',e)
})

messaging.onMessage(function(payload){
  console.log('onMessage:',payload)
  //event listener need to be implemented in the react code
  document.dispatchEvent(firebaseMessageReceived(payload))
})