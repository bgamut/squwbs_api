if('undefined'===typeof window){
importScripts("https://www.gstatic.com/firebasejs/7.0.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.0.0/firebase-messaging.js");

var firebaseConfig = {
    messagingSenderId:'404719977912'
    ,apiKey:'AIzaSyA9VVBgegATYGan6PGuvCjsuG0JL2OIX14'
    ,authDomain:'assistant-569a2.firebaseapp.com'
    ,databaseURL:'https://assistant-569a2.firebaseio.com'
    ,projectId:'assistant-569a2'
    ,storageBucket:'assistant-569a2.appspot.com'
    ,appId:'1:404719977912:web:04d0a42a3242d6c2'
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging()
// messaging.setBackgroundMessageHandler(function(payload){
//     const title="squwbs notification"
//     const options={
//         body:payload.data.status
//     }
//     return document.registration.showNotification(title,options)
// })
const askForPermissioToReceiveNotifications = async () => {
 
    try {
        //const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();
        
        
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
        return token;
    } catch (error) {
    console.error(error);
  }
}
askForPermissioToReceiveNotifications()
messaging.setBackgroundMessageHandler(function(payload){
    const title="squwbs notification"
    const options={
        body:payload.data.status
    }
    //return self.registration.showNotification(title,options)
    //window.registration.showNotification(title,options)
    window.ServiceWorkerRegistration.showNotification(title,options)
})
// messaging.onMessage(function(payload){
//     console.log('this is from messaging : ',payload)
// })
}