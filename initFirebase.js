//import withQuery from "with-query/dist";

//import { EventEmitter } from "events";
//const uuidv4 = require('uuid/v4')
// function uuidv4() {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//     return v.toString(16);
//   });
// }
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
  console.log('firebasetoken event fired')
  fetch('https://squwbs-252702.appspot.com/register',{
            method:'post',
            headers:{
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              token:message
            })
          })
          .then((result)=>{
              return result.json()
          })
          .then((json)=>{
              console.log('initFirebase.js 32 register list : ',stringifyObject(json))
          })
          .catch((err)=>{
              console.log('initFirebase.js 41 register error : ',err)
          })
  window.firebaseToken=message
  //document.getElementById("messager").setAttribute('firebaseToken',message)
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
const askForPermissioToReceiveNotifications = async () => {
 
  try {
      //const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();
      
      firebaseTokenReceived(token)
      


      console.log('token do usuário:', token);
      var url ="https://fcm.googleapis.com/fcm/send"
      var headers = {
          "Content-Type": "application/json",
          "Authorization": "key=AAAAXjswxbg:APA91bEpU8908It6G_CrMx8W5DpY2MBK5G3k0VNoJw0Aku-o43HjFnc36F_SB9cT3TrHXOA4gztiJ8xgF6lukf8EHbSdYUe3DUNjOmWd-QHZL6GTrtETkRs2Rh-69rphLlFDUdb5VqEa"
      }
      var body ={
          "notification": {
              "title":"Welcome",
              "body":"We'll try to be descrete about it",
              "click_action": "http://localhost:3000/",
              "icon":"https://squwbs.com/favicon.ico"
          },
          "to":String(token)
          
      }
      fetch(url,{
          method:"POST",
          headers:headers,
          body:JSON.stringify(body)
        }).then((res)=>{
          console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
      

        // fetch('https://squwbs-252702.appspot.com/kakaoadminkey')
        //   .then((res)=>{
        //       return res.json()
        //   }).then((json)=>{
        //     var newKey = json.key
        //     console.log("yo1:",json.key)
        //     console.log("yo2:",token)
        //     // fetch(withQuery('https://squwbs-252702.appspot.com/kakaopushregister',{
        //     //   mode:'cors',
        //     //   key:key,
        //     //   token:token
        //     // }))
        //     var url = new URL('https://squwbs-252702.appspot.com/kakaopushregister')
        //     // var params = {
        //     //   mode:'cors',
        //     //   key:newKey,
        //     //   token:token
        //     // }
        //     // Object.keys(params).forEach(oneOfTheKeys=>url.searchParams.append(oneOfTheKeys,params[oneOfTheKeys]))
        //     var headers = {"Content-Type": "application/json"}
        //     var newBody = {
        //       "key":String(newKey),
        //       "token":String(token)
        //     }
        //     //fetch(url)
        //     fetch(url,{
        //       "method":"post",
        //       // headers:headers,
        //       "body":JSON.stringify(newBody)
        //     })
        //       .then((res)=>{
        //         return res.json()
        //       }).then((json)=>{
        //         console.log(json)
        //       }).catch((err)=>{
        //         console.log(err)
        //       })
              // var headers = {
              //     'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
              //     'Cache-Control':'no-cache',
              //     'Authorization': 'KakaoAK '+json.key
              // }
              // fetch('https://kapi.kakao.com/v1/push/register',{
              //     headers:headers,
              //     method:"post",
              //     uuid:Math.floor(Math.random()*(Math.pow(2,63)-1)+1),
              //     device_id:uuidv4(),
              //     push_type:'gcm',
              //     push_token:token
              // })

              // .then((res)=>{
              //     return res.json()
              // })
              // .then((json)=>{
              //     console.log('initFirebase.js 109 : ',json)
              //     //console.log('kakaoJSON updated!')
              //     console.log('initFirebase 386 JSON TOKEN : ',json.access_token)
              //     // fetch('https://squwbs.pythonanywhere.com/kakao',{
              //     //     //token:this.state.kakaoJSON.access_token
              //     //     token:json.access_token
              //     // })
              //     // .then((result)=>{
              //     //     return result.json()
              //     // })
              //     // .then((json)=>{
              //     //     console.log('initFirebase.js 120 friends list : ',stringifyObject(json))
              //     // })
              //     // .catch((err)=>{
              //     //     console.log('initFirebase.js 123 returns error : ',err)
              //     // })

              //     //})
                  
                  
              // })
          // })
          // .catch((err)=>{
          //     console.log('initFirebase.js 132 : ',err)
          // })

          

      return token;
    }
    catch (error) {
      console.error(error);
    }
}
askForPermissioToReceiveNotifications()
// const functions = firebase.functions()

// const onMessageCreate = functions.database 
// .ref('chat')
// .onCreate((snapshot,context)=>{
//   console.log('firebase function fired from initFirebase.js',snapshot.val())
// })

// messaging.usePublicVapidKey('BJKrJ_yZxUsiW1CJR0DB-5pJrKG7VzWtrSp6a0C-OTx1IQrV0KcW8xLIjuB5pMRo5aiV6xDw0wt3Q45TT7bB_CI')
// //following needs to be consumed in 
// //document.firebaseMessaging=messaging
// console.log("this is firebase in action",messaging)
// messaging.requestPermission()
// .then(()=>{
//   console.log('permission granted')
//   return messaging.getToken()

// }).then(function(token){
//   //console.log('push token : ',token)
//   //window.messagingToken = token
//   //event listener need to be implemented in the react code
//   //document.dispatchEvent(firebaseTokenReceived(token))
//   var headers = {"Content-Type": "application/json"};

//   var body={}
//   var url = new URL('https://squwbs-252702.appspot.com/firebaseToken')
//   //body.token=token
//   //console.log(body)
//   var params={token:token}
//   url.search=new URLSearchParams(params)
//   fetch(url)
//   // .then((res)=>{
//   //   return res.json();
//   // })
//   .then(()=>{
//      //console.log(json)
//     fetch('https://squwbs-252702.appspot.com/readCookies')
//     .then(res=>{
//       return res.json()
//     }).then((json)=>{
//       console.log('initFirebase.js 78:',json)
//     })
//     //console.log()
//   })
//   .catch((err)=>{
//     console.log(err)
//   })
// })

// .catch((e)=>{
//   console.log('permission denied',e)
// })
messaging.onTokenRefresh(() => {
  messaging.getToken().then((refreshedToken) => {
    console.log('Token refreshed.');
    // Indicate that the new Instance ID token has not yet been sent to the
    // app server.
    //setTokenSentToServer(false);
    // Send Instance ID token to app server.
    //sendTokenToServer(refreshedToken);
    firebaseTokenReceived(refreshedToken)
    // ...
  }).catch((err) => {
    console.log('Unable to retrieve refreshed token ', err);
    showToken('Unable to retrieve refreshed token ', err);
  });
});

messaging.onMessage(function(payload){
  console.log('onMessage:',payload)
  //event listener need to be implemented in the react code
  window.dispatchEvent(firebaseMessageReceived(payload))
  // window.registration.showNotification(
  //   payload.notification.title,
  //   payload.notification.body
  //   )
})

//firebase.initializeApp(firebaseConfig);
//const messaging = firebase.messaging()

// messaging.setBackgroundMessageHandler(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   // const notificationTitle = 'Background Message Title';
//   // const notificationOptions = {
//   //   body: 'Background Message body.',
//   //   icon: '/firebase-logo.png'
//   // };
//   const notificationTitle=payload.notification.title
//   const notificationOptionss=payload.notification.body

//   window.registration.showNotification(notificationTitle,
//     notificationOptions);
// });
