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
window.addEventListener('firebaseMessageReceived',function(event){
  //below code was tested.
  var a = navigator.userAgent.toLowerCase()
  var isDesktop = !(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substring(0,4)));
  // if(isDesktop==true){
  //   //document.location.href="https://bgamut.github.io/desktop/"
  //   //document.location.href="https://squwbs-252702.appspot.com/"
  //   console.log('this is a desktop environment')
  //   console.log("index.html: ",event.detail.message)
  //   var element = document.createElement('web-notification')
  //   element.setAttribute('id','notificationEl1')
  //   element.setAttribute('title',event.detail.message.notification.title)
  //   element.setAttribute('body',event.detail.message.notification.body)
  //   element.setAttribute('icon',event.detail.message.notification.icon)
  //   element.setAttribute('click_action',event.detail.message.notification.click_action)
  //   element.setAttribute('notify-on-load',true)
  //   element.setAttribute('timeout','15000')
  //   document.body.appendChild(element)
  //   document.getElementById('notificationEl1').notify()
  //   //delete element
  // }
  // else{
    //confirm(event.detail.message.notification.body)
    function registerServiceWorker() {
      return navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        console.log('Service worker successfully registered.');
        return registration;
      })
      .catch(function(err) {
        alert('rSW() error'+err)
        console.error('Unable to register service worker.', err);
      });
    }
    registerServiceWorker()
    .then(function(registration) {
      const title = event.detail.message.notification.title;
      //const title = 'event.detail.message.notification.title';
      const options = {
        body: event.detail.message.notification.body,
        //icon: event.detail.message.notification.icon,
        //body: 'event.detail.message.notification.body',
        //badge: 'https://squwbs-252702.appspot.com/favicon.ico',
        // icon: 'https://squwbs-252702.appspot.com/favicon.ico',
        // actions: [
        //   {
        //     action: 'coffee-action',
        //     title: 'Coffee',
        //     icon: 'https://squwbs-252702.appspot.com/favicon.ico'
        //   },
        //   {
        //     action: 'doughnut-action',
        //     title: 'Doughnut',
        //     icon: 'https://squwbs-252702.appspot.com/favicon.ico'
        //   }
        // ]
      }
      registration.showNotification(title, options);
      alert(event.detail.message.notification.body)
    })
    .catch(function(err){
      alert(err)
    })
    
  // }
})
const firebaseTokenReceived =(message)=> {
  console.log('firebasetoken event fired',message)
  
  window.firebaseToken=message
  //document.getElementById("messager").setAttribute('firebaseToken',message)
  firebaseMessageReceived(message)
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
//const messaging = firebase.messaging()
if (firebase.messaging.isSupported()){ 
    const messaging = firebase.messaging();
  const askForPermissioToReceiveNotifications = async () => {
  
    // try {
        //const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();
        
        firebaseTokenReceived(token)
        


        console.log('token do usuário:', token);
        // var url ="https://fcm.googleapis.com/fcm/send"
        // var headers = {
        //     "Content-Type": "application/json",
        //     "Authorization": "key=AAAAXjswxbg:APA91bEpU8908It6G_CrMx8W5DpY2MBK5G3k0VNoJw0Aku-o43HjFnc36F_SB9cT3TrHXOA4gztiJ8xgF6lukf8EHbSdYUe3DUNjOmWd-QHZL6GTrtETkRs2Rh-69rphLlFDUdb5VqEa"
        // }
        // var body ={
        //     "notification": {
        //         "title":"Welcome",
        //         "body":"We'll try to be descrete about it",
        //         "click_action": "http://localhost:3000/",
        //         "icon":"https://squwbs.com/favicon.ico"
        //     },
        //     "to":String(token)
            
        // }
        // fetch(url,{
        //     method:"POST",
        //     headers:headers,
        //     body:JSON.stringify(body)
        //   }).then((res)=>{
        //     console.log(res)
        //   }).catch((err)=>{
        //       console.log(err)
        //   })
        // var message = {
        //   to: token,
        //   collapse_key:'do_not_collapse',
        //   notification:{
        //     title:'welcome to squwbs',
        //     body:'test body'
        //   },
        // }

        // fcm.send(message,function(err,res){
        //   if(err){
        //     console.log(err)
        //   }
        //   else{
        //     console.log(res)
        //   }
        // })


        // fetch('https://squwbs-252702.appspot.com/register',{
        //   method:'post',
        //   mode:'cors',
        //   headers:{
        //     'Content-type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     token:token
        //   })
        //   // body:{
        //   //   token:message
        //   // }
        // })
        // .then((result)=>{
        //   //we basically do nothing with the result.json()
        //   console.log('register result processing initFirebase 40 ')
        //   console.log('initFirebase.js 32 register result.json() : ',(result.json()))
        //   return result.json()
        // })
        // .then((json)=>{
        //   console.log('json received',json)
        //   // var url ="https://squwbs-252702.appspot.com/sendfcmall"
        //   // var headers = {
        //   //     "Content-Type": "application/json",
              
        //   // }
        //   // var body ={
        //   //     //"to": String(token),
        //   //     "collapse_key":"do_not_collapse",
        //   //     "notification": {
        //   //         "title":"Welcome",
        //   //         "body":"this is fired via sendfcmall",
        //   //         // "click_action": "http://localhost:3000/",
        //   //         // "icon":"https://squwbs.com/favicon.ico"
        //   //     },
              
        //   // }
        //   // fetch(url,{
        //   //     method:"POST",
        //   //     mode:'cors',
        //   //     headers:headers,
        //   //     body:JSON.stringify(body)
        //   //   }).then((res)=>{
        //   //     console.log(res)
              

        //   //   }).catch((err)=>{
        //   //       console.log(err)
        //   //   })
          
        // })
        
        // .catch((err)=>{
        //     console.log('initFirebase.js 41 register error : ',err)
            
        // })
        const tokenRegistration = await fetch('https://squwbs-252702.appspot.com/register',{
          method:'post',
          mode:'cors',
          headers:{
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            token:token
          })
          // body:{
          //   token:token
          // }
        })

        // var url ="https://squwbs-252702.appspot.com/sendfcmall"
        // var headers = {
        //     "Content-Type": "application/json",  
        // }
        // var body ={
        //     //"to": String(token),
        //     "collapse_key":"do_not_collapse",
        //     "notification": {
        //         "title":"Welcome",
        //         "body":"this is fired via sendfcmall",
        //         // "click_action": "http://localhost:3000/",
        //         // "icon":"https://squwbs.com/favicon.ico"
        //     },
        // }
        // const sent = await fetch(url,{
        //     method:"POST",
        //     mode:'cors',
        //     headers:headers,
        //     body:JSON.stringify(body)
        //   })
        // console.log('initfirebase await fetch tokenRegistration:',tokenRegistration.json() + 'sent :'+sent.json()) 
        console.log('initfirebase await fetch tokenRegistration:',tokenRegistration.json())    


        // var url ="https://squwbs-252702.appspot.com/sendfcmall"
        // var headers = {
        //     "Content-Type": "application/json",
            
        // }
        // var body ={
        //     //"to": String(token),
        //     "collapse_key":"do_not_collapse",
        //     "notification": {
        //         "title":"Welcome",
        //         "body":"this is fired via sendfcmall",
        //         // "click_action": "http://localhost:3000/",
        //         // "icon":"https://squwbs.com/favicon.ico"
        //     },
            
        // }
        
        // fetch(url,{
        //     method:"POST",
        //     mode:'cors',
        //     headers:headers,
        //     body:JSON.stringify(body)
        //   }).then((res)=>{
        //     console.log(res)
        //     // var newUrl ="https://squwbs-252702.appspot.com/sendfcmall"
        //     // var newBody ={
              
        //     //   "collapse_key":"do_not_collapse",
        //     //   "notification": {
        //     //       "title":"Welcome",
        //     //       "body":"this is fired via sendfcmall",
        //     //       // "click_action": "http://localhost:3000/",
        //     //       // "icon":"https://squwbs.com/favicon.ico"
        //     //   },
              
        //     // }
        //     // fetch(newUrl,{
        //     //   method:"POST",
        //     //   headers:headers,
        //     //   body:JSON.stringify(newBody)
        //     // }).then((res)=>{
        //     //   console.log(res)
        //     // }).catch((err)=>{
        //     //   console.log(err)
        //     // })



        //   }).catch((err)=>{
        //       console.log(err)
        //   })


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
          //       var headers = {
          //           'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          //           'Cache-Control':'no-cache',
          //           'Authorization': 'KakaoAK '+json.key
          //       }
          //       fetch('https://kapi.kakao.com/v1/push/register',{
          //           headers:headers,
          //           method:"post",
          //           uuid:Math.floor(Math.random()*(Math.pow(2,63)-1)+1),
          //           device_id:uuidv4(),
          //           push_type:'gcm',
          //           push_token:token
          //       })

          //       .then((res)=>{
          //           return res.json()
          //       })
          //       .then((json)=>{
          //           console.log('initFirebase.js 109 : ',json)
          //           //console.log('kakaoJSON updated!')
          //           console.log('initFirebase 386 JSON TOKEN : ',json.access_token)
          //           // fetch('https://squwbs.pythonanywhere.com/kakao',{
          //           //     //token:this.state.kakaoJSON.access_token
          //           //     token:json.access_token
          //           // })
          //           // .then((result)=>{
          //           //     return result.json()
          //           // })
          //           // .then((json)=>{
          //           //     console.log('initFirebase.js 120 friends list : ',stringifyObject(json))
          //           // })
          //           // .catch((err)=>{
          //           //     console.log('initFirebase.js 123 returns error : ',err)
          //           // })

          //           //})
                    
                    
          //       })
          //   })
          //   .catch((err)=>{
          //       console.log('initFirebase.js 132 : ',err)
          //   })

            

        return token;
      // }
      // catch (error) {
      //   console.error(error);
      // }
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
}

