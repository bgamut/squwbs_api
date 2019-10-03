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
//following needs to be consumed by the component
//document.firebaseMessaging=messaging
console.log("this is firebase in action",messaging)
messaging.requestPermission()
.then(()=>{
  console.log('permission granted')
  return messaging.getToken()

}).then(function(token){
  //console.log('push token : ',token)
  //window.messagingToken = token
  //event listener need to be implemented in the react code
  //document.dispatchEvent(firebaseTokenReceived(token))
  var headers = {"Content-Type": "application/json"};

  var body={}
  var url = new URL('https://squwbs-252702.appspot.com/firebaseToken')
  //body.token=token
  //console.log(body)
  var params={token:token}
  url.search=new URLSearchParams(params)
  fetch(url)
  // .then((res)=>{
  //   return res.json();
  // })
  .then(()=>{
     //console.log(json)
    fetch('https://squwbs-252702.appspot.com/readCookies')
    .then(res=>{
      return res.json()
    }).then((json)=>{
      console.log('initFirebase.js 78:',json)
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