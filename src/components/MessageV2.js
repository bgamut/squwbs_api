
import React, {Component,useCallback,useState,useRef,useEffect} from 'react'
import {Text,View,Dimensions,TouchableOpacity,Image,Animated,Easing,ScrollView} from 'react-native'
import Dropzone, {useDropzone} from 'react-dropzone'
//import {Context} from '../context'
import Fade from 'react-reveal/Fade'
import XLSX from 'xlsx'
import stringifyObject from 'stringify-object'
//import {swing} from "react-animations"
//import styled, { keyframes } from 'styled-components'
import Radium, {StyleRoot} from 'radium'
import iglogo from './icons/iglogo.svg'
import P5Wrapper from 'react-p5-wrapper'
import uuidv4 from 'uuid-js'

//import * as firebase from 'firebase/app'
//import * as functions from 'firebase-functions'
//import * as admin from 'firebase-admin'
//import 'firebase/functions'
//import 'firebase/auth'
//import 'firebase/firestore'

//import * as functions from 'firebase-functions'

//var client

import './css/iconHover.css'
import { send } from 'q'

//import openSocket from 'socket.io-client';
// var net = require('node-net')
// var tcpClient = new net()
// console.log('Message.js 28:',tcpClient)
import firebase from 'firebase'
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

var collapse_key = "do_not_collapse"
const initializeFirebase =()=>{
    firebase.initializeApp({
        messagingSenderId:'404719977912'
        ,apiKey:'AIzaSyA9VVBgegATYGan6PGuvCjsuG0JL2OIX14'
        ,authDomain:'assistant-569a2.firebaseapp.com'
        ,databaseURL:'https://assistant-569a2.firebaseio.com'
        ,projectId:'assistant-569a2'
        ,storageBucket:'assistant-569a2.appspot.com'
        ,appId:'1:404719977912:web:04d0a42a3242d6c2'
    })
}
const line = require('@line/bot-sdk')
const withQuery = require('with-query').default;
const axios = require('axios')
//const io = require('socket.io')

//const functions = require('firebase-functions');
const _ = require('lodash')
var createWebNotification = require('web-notification')
// var PushNotification = require('react-native-push-notification')
// PushNotification.configure({
//     onRegister:function(token){
//         console.log('TOKEN:', token)
//     },
//     onNotification:function(notification){
//         console.log("NOTIFICATION:",notification);
//         //notification.finish(PushNotificationIOS.FetchResult.NoData);
//     },
//     senderID:'404719977912',
//     permissions:{
//         alert:false,
//         badge:false,
//         sound:false
//     },
//     popInitialNotification:true,
//     requestPermissions:true
// })

// const firebase = require('firebase')
// var admin = require('firebase-admin')
// const functions = require('firebase-functions')








class Message extends Component{
    
    constructor(props){
        super(props)
        this.state={
            height:0,
            width:0,
            client:null,
            botId:'',
            content:{},
            chatHistory:[],
            show:'show',
            textValue:'',
            parent:[]
            
        }
        this.inputRef = React.createRef()
        this.randomRef= React.createRef()
        const swUrl = process.env.PUBLIC_URL+'service-worker.js'
        console.log('this is the navigator ',window.navigator)
        console.log('this is the serviceWorker ',window.navigator.serviceWorker)
        window.navigator.serviceWorker.register(swUrl)
        window.navigator.serviceWorker.ready
        .then(function(registration){
        console.log('this is the registration',registration)
          return registration.pushManager.getSubscription()
          .then(function (subscription){
            console.log('this is the subscription', subscription)
            if(subscription){
                
              return subscription
            }
            else{
              fetch('https://squwbs-252702.appspot.com/vapidkey')
              .then((result)=>{
                return result.json()
              })
              .then((json)=>{
                console.log("this is the json",json)
                const vapidPublicKey = json.key
                console.log("this is the vapidKey", json.key )
                const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)
                
                return registration.pushManager.subscribe({
                  userVisibleOnly:true,
                  //applicationServerKey:convertedVapidKey
                  applicationServerKey:vapidPublicKey
                })
              }).then(function(subscription){
                console.log("this is the subscription",subscription)
                // fetch('https://squwbs-252702.appspot.com/register',{
                //   method:'post',
                //   headers:{
                //     'Content-type': 'application/json'
                //   },
                //   body: JSON.stringify({
                //     subscription:subscription
                //   })
                // })
                fetch('https://squwbs-252702.appspot.com/sendNotification',{
                  method: 'post',
                  headers: {
                    'Content-type': 'application/json'
                  },
                  body: JSON.stringify({
                    subscription: subscription,
                    payload: 'serviceWorker.js Works',
                    delay: 5,
                    ttl: 0,
                  }),
            
                })
              })
              .catch((error)=>{
                console.log(error)
              })
            }
            
  
          })
        })
    }
    
    handleKeyPress=(e)=>{
        
        //setTextValue(e.target.value)
        this.setState({textValue:e.target.value})
        //console.log(inputRef.current.value)
        
        if(e.key=='Enter'){
            e.preventDefault()
            this.handleSend()
            //handleGet()
        }
        // console.log(e.key)
        
    }
    handleChange=(e)=>{
        //console.log(e.target.value)
        //this.setState({value:e.target.value})
        this.setState({textValue:e.target.value})
        
        
    }
    handleSend=(e)=>{
        let message=this.state.textValue
        let topic='chat'
        console.log(this.state.textValue)

        fetch(
            withQuery('https://squwbs-252702.appspot.com/saysomething'
                ,{
                    message:message,
                    mode:'cors'
                }   
            )
        )
        .then(function(response){
            console.log('message 120 response:',response)
        })
        .catch(function(error){
            console.log('message 123 err:',error)
        })
        this.setState({textValue:''})
        this.inputRef.current.focus()
        
    }

    handleGet=(e)=>{
       

        
         
    }
    
    updateDimensions=()=>{
        this.setState({
            height:(Dimensions.get('window').height),
            width:(Dimensions.get('window').width)
            })
    }
    handleLoad=()=>{
        console.log('message.js 174 handleLoad function fired')
        const attachit=()=>{ 
            if(!window){
                console.log('message.js 177 document not loaded..')
                window.requestAnimationFrame(attachit);
            } 
            else{
                console.log('message.js 181 document not loaded adding event listeners')
                window.addEventListener('firebaseMessageReceived',function(event){
                    //below code was tested.
                    console.log("fcm from message.js 177: ",event.detail.message)
                    var element = document.createElement('web-notification')
                    element.setAttribute('id','notificationEl1')
                    element.setAttribute('title',event.detail.message.notification.title)
                    element.setAttribute('body',event.detail.message.notification.body)
                    element.setAttribute('icon',event.detail.message.notification.icon)
                    element.setAttribute('click_action',event.detail.message.notification.click_action)
                    element.setAttribute('notify-on-load',true)
                    element.setAttribute('timeout','15000')
                    document.body.appendChild(element)
                    document.getElementById('notificationEl1').notify()
                    //delete element
                })
                window.addEventListener('firebaseTokenReceived',function(event){
                    console.log('token received from message.js 188')
                    console.log('event : ',event)
                    console.log('event.detail : ',event.detail)
                    console.log("Token from message.js 180: ",event.detail.message)
                    var token = event.detail.message
                    var url = new URL('https://squwbs-252702.appspot.com/pushregister')
                    var headers = {"Content-Type": "application/json"}
                    var newBody = {
                        "token":String(token)
                    }
                    fetch(url,{
                        "method":"post",
                        "body":JSON.stringify(newBody)
                    })
                    .then((res)=>{
                        return res.json()
                    }).then((json)=>{
                        console.log(json)
                    }).catch((err)=>{
                        console.log(err)
                    })
                    // fetch(withQuery('https://squwbs-252702.appspot.com/kakaoadminkey'))
                    //     .then((res)=>{
                    //         return res.json()
                    //     }).then((json)=>{

                    //         var headers = {
                    //             'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                    //             'Cache-Control':'no-cache',
                    //             'Authorization': 'KakaoAK '+json.key
                    //         }
                    //         fetch('https://kauth.kakao.com/oauth/token',{
                    //             headers:headers,
                    //             mode:"post",
                    //             uuid:Math.floor(Math.random()*(Math.pow(2,63)-1)+1),
                    //             device_id:uuidv4(),
                    //             push_type:'gcm',
                    //             push_token:token
                    //         })
                    //         .then((res)=>{
                    //             return res.json()
                    //         })
                    //         .then((json)=>{
                    //             console.log('kakao.js 309 : ',json)
                    //             //this.setState({kakaoJSON:json},()=>{
                                    
                    //             console.log('kakaoJSON updated!')
                    //             // var headers = {
                    //             //     'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                    //             //     'Cache-Control':'no-cache'
                    //             // }
                    //             // var token= this.state.kakaoJSON.access_token
                    //             // var url = "https://kapi.kakao.com/v1/api/talk/friends"
                    //             // var bearer = 'Bearer '+token
                    //             // headers["Authorization"]=bearer
                    //             // fetch(url,{headers})
                    //             // fetch(withQuery('https://squwbs-252702.appspot.com/kakao',{
                    //             // fetch(withQuery('http://squwbs.herokuapp.com/kakao',{
                    //             console.log('Kakao.js 386 JSON TOKEN : ',json.access_token)
                    //             fetch(withQuery('https://squwbs.pythonanywhere.com/kakao',{
                    //                 //token:this.state.kakaoJSON.access_token
                    //                 token:json.access_token
                    //             }))
                    //             .then((result)=>{
                    //                 return result.json()
                    //             })
                    //             .then((json)=>{
                    //                 console.log('Kakao.js 386 friends list : ',stringifyObject(json))
                    //             })
                    //             .catch((err)=>{
                    //                 console.log('kakao.js 396 returns error : ',err)
                    //             })

                    //             //})
                                
                                
                    //         })
                    //     })
                    //     .catch((err)=>{
                    //         console.log('kakao.js 312 : ',err)
                    //     })

                })
                // window.addEventListener("beforeunload",function(e){
                //     fetch('https://squwbs-252702.appspot.com/logout')
                //     .then(()=>{
                //         console.log('successfully logged out')
                //     })
                //     .catch((err)=>{
                //         console.log('logout error : ',err)
                //     })
                //     //tcpClient.destroy()
                //     clearInterval(this.refreshInterval())
                // })

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
                // fetch('https://squwbs-252702.appspot.com/vapidkey')
                //     .then((result)=>{
                //         return result.json()
                //     })
                //     .then((json)=>{
                //         //var pubKey=urlBase64ToUint8Array(json.key)
                //         var pubKey = json.key
                //         var register
                //         console.log("pubKey = ",pubKey)
                //         async function send(publicKey) {
                //             console.log('Registering service workder ..')
                //             // register = await navigator.serviceWorker.register('./worker.js',
                //             // {
                //             //     scope:'/'
                //             // })
                //             addEventListener('push',function(event){
                //                 //below code was tested.
                //                 const data= event.data.json()
                //                 console.log("push recieved: ",data)
                //                 navigator.serviceWorker.ready.then(function(registration){
                //                     registration.showNotification(data,title,{
                //                         body:'Notified',
                                        
                //                     })
                //                 })
                            
                //             })
                //             console.log('Service worker registered')
                //         console.log('Registering push...')
                //         const subscription = await register.pushmanager.subscribe({
                //             userVisibileOnly:true,
                //             applicationServerKey:publicKey
                //         })
                //         console.log('sending push')
                //         await fetch('https://squwbs-252702.appspot.com/subscribe',
                //             {
                //                 method:'POST',
                //                 body:JSON.stringify(subscription),
                //                 // headers:{
                //                 //     'content-type':'application/json'
                //                 // }
                //             })
                //         console.log('push sent')
                                                
                        
                            

                //         }
                //         send(pubKey)
                // })
                //     .catch((err)=>{
                //         console.log(err)
                //     })
              
                // var myNotification = createWebNotification({
                //     title:'my title',
                //     body: 'my body'
                // })
                // document.body.appendChild(myNotification)
                //console.log()
                // const checkTokenAvailability = () =>{
                //     console.log('Checking Firebase Token Availability:')
                //     const checkElement=()=>{
                //         if(window.firebaseToken != undefined){
                //             //func()
                //             console.log('token found!')
                //             //return true
                //         }
                //         else{
                //             //return false
                //             console.log('waiting for token to be passed')
                //             //return
                //         }
                //     }
                //     const checkit=(func)=>{
                //         clearInterval(func)
                //     }
                //     const runit=()=>{
                //         setInterval(checkElement(),15000)
                //     }
                    
                    
                //     runit()


                    
                // }
                // fetch(withQuery('https://squwbs-252702.appspot.com/kakaoadminkey'),{mode:'cors'})
                // .then((res)=>{
                //     return res.json()
                // })
                // .then((json)=>{
                //     console.log("messagev2 346 : ",json)
                //     console.log("messagev2 347 : ",window.firebaseToken)
                //     // checkTokenAvailability(1,(()=>
                //     // {
                //     //     var headers = {
                //     //         'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                //     //         'Cache-Control':'no-cache',
                //     //         'Authorization': 'KakaoAK '+json.key
                //     //     }
                //     //     fetch('https://kauth.kakao.com/oauth/token',{
                //     //         headers:headers,
                //     //         mode:"post",
                //     //         uuid:Math.floor(Math.random()*(Math.pow(2,63)-1)+1),
                //     //         device_id:uuidv4(),
                //     //         push_type:'gcm',
                //     //         push_token:window.firebaseToken
                //     //     })
                //     //     .then((res)=>{
                //     //         return res.json()
                //     //     })
                //     //     .then((json)=>{
                //     //         console.log('kakao.js 309 : ',json)
                //     //         //this.setState({kakaoJSON:json},()=>{
                                
                //     //         console.log('kakaoJSON updated!')
                            
                            
                //     //     })
                //     //     .catch((err)=>{
                //     //         console.log(err)
                //     //     })
                //     // }))
                //     // checkTokenAvailability()
                    
                // })
                // .catch((err)=>{
                //     console.log('kakao.js 312 : ',err)
                // })
            } 
            
        }
        attachit()
        
    }
    updateMessages = () =>{
        //let parent = []

        // fetch(withQuery('https://squwbs-252702.appspot.com/socket.io', {
        //     mode:'cors'
        // }))
        // .then((result)=>{
            
        //     return result.json()
        // })
        // .then((json)=>{
        //     //console.log(json.chatHistory)
        //     var newChatHistory = []
        //     for (var i=0; i<Object.keys(json.chatHistory).length; i++){
        //         newChatHistory.push(json.chatHistory[i])
        //     }
        //     console.log('messageV2 179:',newChatHistory)
            

        //     var newParent=[]
        //     newChatHistory.map((chat,i,arr)=>{

        //         //var newParent = this.state.parent.slice()
        //         newParent.push(
        //         <View
                    
        //             style={{
        //                 //height:50,
        //                 width:"100%",
        //                 backgroundColor:'white'
        //             }}
        //         >
        //             <Text
        //                 style ={
        //                 {
        //                     textDecorationLine:'none',
        //                     color:'grey',
        //                     backgroundColor:'transparent',
        //                     fontSize: 14,
        //                     fontWeight:'700',
        //                     marginLeft:5,
        //                     marginRight:5,
        //                     textAlign:'left',
        //                     alignItems:'center',
        //                     justifyContent:'flex-start',
        //                     flexDirection:'row',
        //                 }
        //             }
        //             >
        //                 {/* chat.userProvier && chat.user */}
        //                 {chat.chat}
        //             </Text>
        //         </View>
        //         )
        //         // this.setState({parent:newParent},()=>{
        //         //     //this.forceUpdate()
        //         //     //console.log(this.state.chatHistory)
        //         //     //console.log('messageV2.js 218:',this.state.parent)
        //         //     setTimeout(this.createChatList,15000)
        //         // //return parent; 
        //         // })
        //         this.setState({parent:newParent},()=>{
        //             //setTimeout(this.createChatList,15000)
        //         })
        //     })


                
            
            
           
        // })
        // .catch((err)=>{
           
        // })
        
    }
    componentDidMount(){
        
        
        //initializeFirebase()
        
        //document.getElementById('notificationEl1').notify();
        //console.log("randomRef")
        // const notification = ()=>{
        // return(
        //     <web-notification 
        //         id="notificationEl1"
        //         title="Notification 1"
        //         body="Hello World"
        //         //icon="homer-simpson.jpg"
        //         timeout="3000"
        //     />
        // )
        // }
        // var element = document.createElement('web-notification')
        // element.setAttribute('id','notificationEl1')
        // element.setAttribute('title','notification 1')
        // element.setAttribute('body','Hellow World')
        // element.setAttribute('timeout','3000')
        // document.body.appendChild(element)
        // document.getElementById('notificationEl1').notify();
        Dimensions.addEventListener('change',(e)=>{
            this.updateDimensions()
        })
        this.updateDimensions()
        window.addEventListener('load',this.handleLoad())
        // function updateMessages(){
        //     fetch(withQuery('https://squwbs-252702.appspot.com/socket.io', {
        //         mode:'cors'
        //     }))
        //     .then((result)=>{
                
        //         return result.json()
        //     })
        //     .then((json)=>{
        //         //console.log(json.chatHistory)
        //         var newChatHistory = []
        //         for (var i=0; i<Object.keys(json.chatHistory).length; i++){
        //             newChatHistory.push(json.chatHistory[i])
        //         }
        //         console.log(newChatHistory)
        //         this.setState({chatHistory:newChatHistory},()=>{
        //             this.forceUpdate()
        //             console.log(this.state.chatHistory)
        //         })
                
               
        //     })
        //     .catch((err)=>{
               
        //     })
        // }
        const refreshInterval=()=>{
            setInterval(this.updateMessages,15000)
        }
        window.addEventListener("beforeunload",function(e){
            console.log(window.firebaseToken)
            // fetch('https://squwbs-252702.appspot.com/unregister',{
            //     method:'post',
            //     headers:{
            //       'Content-type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //       token:window.firebaseToken
            //     })
            //   })
            // .then(()=>{
            //     console.log('successfully unregistered firebaseToken')
            // })
            // .catch((err)=>{
            //     console.log('unregister error : ',err)
            // })
            fetch('https://squwbs-252702.appspot.com/logout')
            .then(()=>{
                console.log('successfully logged out')
            })
            .catch((err)=>{
                console.log('logout error : ',err)
            })
            
            clearInterval(refreshInterval())
        })
        
        //this.createChatList()
        
        refreshInterval()
        // var i = 0
        // const checking = ()=>{
        //     console.log('checking:',i)
        //     console.log('window.firebaseToken:',window.firebaseToken)
        //     console.log(window.firebaseToke!=undefined)
        //     console.log(window.firebaseToken!=undefined)
        //     if(window.firebaseToken!=undefined){
        //         console.log("it's not undefined")
        //         clearInterval(wait())
                
        //     }
            
        // }
        console.log('comfortable')
        
        
        
        // const wait=()=>{
        //     setInterval(checking,5000)
        // }
        // wait()
        // const check=()=>{
        //     console.log('in while loop : ', i)
        //     i++
        //     if(window.firebaseToken!=undefined){
        //         clearInterval(wait())
                
        //     }
        // }
        //setInterval(check,5000)
            
        
        console.log('we out biznitch')
        // PushNotification.localNotification({
        //     foreground: false, // BOOLEAN: If the notification was received in foreground or not
        //     userInteraction: false, // BOOLEAN: If the notification was opened by the user from the notification area or not
        //     message: 'My Notification Message', // STRING: The notification message
        //     data: {}, // OBJECT: The push data
           
        // });
        

    }
    
    
        
    
    render(){
      return (
        <Fade 
            when={this.state.show}
            duration={5}
            timeout={5}
        >
            {/* <P5Wrapper /> */}
            
              <View class="container"
                ref={this.randomRef}
                style={{
                    width:this.state.width-50,
                    height:this.state.height,
                    backgroundColor:"transparent",
                    justifyContent:'center',
                    alignItems:'center',
                    flexDirection:'row'
                }}
            >
                <View 
                style={{ 

                width:this.state.width,
                height:this.state.height-50,
                flexDirection:'column',
                padding:0,
                //backgroundColor:'white',
                backgroundColor:'transparent',
                justifyContent:'center',
                alignItems:'center',
                // marginRight:8,
                // marginLeft:8,
                // marginBottom:2,
                // borderRadius:4,
                // borderBottom:2,
                // borderTop:1,
                // borderColor:'#aaa',
                // borderStyle:'solid',
                // overflow:'hidden',
                // boxSizing:"border-box",
                // shadowColor:'#000',
                // shadowOpacity:0.25,
                // shadowRadius:2,
                // shadowOffset:{
                // width:0,
                // height:0
                // },
                // elevation:2
            }} >

      
                    {/* <div href="https://www.instagram.com/squwbs/?hl=ko" ref={imgRef1}/> */}
                    
                   
                      
                      
                        {/* <Animated.View  */}
                        <View
                        
                            style={{
                                backgroundColor:'white',
                                height:this.state.height-175,
                                width:this.state.width-30,
                                //justifyContent:'center',
                                alignItems:'center'
                            }}
                        >
                        <View
                            style={{
                                display:'absolute',
                                backgroundColor:'white',
                                height:this.state.height-181,
                                width:this.state.width-30,
                                top:0,
                                justifyContent:'center',
                                alignItems:'center'
                            }}
                        >
                        <ScrollView
                            style={{
                                backgroundColor:'white',
                                borderLeftColor:'lightgrey',
                                borderRightColor:'lightgrey',
                                borderBottomColor:'lightgrey',
                                borderTopColor:'lightgrey',
                                outlineColor: 'lightgrey',
                                borderWidth:1,
                                borderRadius:4,
                                height:this.state.height-400,
                                width:this.state.width-60,

                            }}
      
                            onScroll={(e)=>{
                                //onScroll(e)
                              }
                            }
                            scrollEnabled={true}
                            scrollEventThrottle={16}
                            showsVerticalScrollIndicator={true}
                            snapToInterval={this.state.height-50}
                            snapeToAlignment='end'
                            decelerationRate="fast"
                            backgorundColor='purple'
                        >
                            {/* <Text>
                                {chatHistory}
                            </Text> */}
                            {/* {this.createChatList()} */}
                            {this.state.parent}
                        </ScrollView>
                        </View>
                        </View>
                        <View
                            style={{

                                justifyContent:"center",
                                alignItems:"center",
                                backgroundColor:'transparent',
                                height:50,
                                width:this.state.width-60,
                                //opacity:opacity
                                //maxWidth:width-600
                                //paddingTop:0,
                                backgroundColor:'white',
                                flexDirection:'row'
                            }}
                        >
                        <View
                            style={{
                                backgroundColor:'white',
                                borderLeftColor:'lightgrey',
                                borderRightColor:'lightgrey',
                                borderBottomColor:'lightgrey',
                                borderTopColor:'lightgrey',
                                outlineColor: 'lightgrey',
                                borderWidth:1,
                                borderRadius:4,
                                height:59,
                                width:this.state.width-60,
                                flexDirection:'row',
                                justifyContent:'center',
                                overflow:'hidden'
                            }}
                        >


                        
                            
                        <textarea id='text-input'type='text' spellCheck="false" 
                            ref={this.inputRef}
                            value={this.state.textValue}

                            style={{
                                // height:height-70,
                                // width:width/2-50,
                                caretColor:'lightgrey',
                                height:39,
                                width:this.state.width-100,
                                fontSize:16,
                                lineHeight:'2em',
                                paddingTop:8,
                                paddingLeft: 8,
                                paddingRight: 8,
                                paddingBottom:8,
                                borderLeftWidth:1,
                                borderColor:'transparent',
                                backgroundColor:'transparent',
                                resize:'none',
                                outlineColor: 'lightgrey',
                                outlineStyle: 'none',
                                borderRadius:4,
                                color:'grey'
                                // marginRight:5
                            }} 
                            onKeyPress={this.handleKeyPress}
                            onChange={this.handleChange}

                            >
                        </textarea> 
                        
                            <View      
                                style={{
                                    height:59,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    //backgroundColor:'transparent'
                                    backgroundColor:'rgb(251,251,251)',
                                    borderColor:'rgb(251,251,251)',
                                    outlineColor: 'lightgrey',
                                    //borderWidth:1,
                                    borderRadius:2,
                                    height:57,
                                   
                                    
                                    justifyContent:'center',
                                }}>
                                <TouchableOpacity
                                    onPress={this.handleSend}
                                >
                                    <Text
                                        style ={
                                            {
                                                textDecorationLine:'none',
                                                color:'rgb(196,196,196)',
                                                fontSize: 14,
                                                fontWeight:'700',
                                                marginLeft:5,
                                                marginRight:5,
                                                textAlign:'center',
                                                alignItems:'center',
                                                justifyContent:'center',
                                                flexDirection:'row',
                                            }
                                        }
                                        className='icon'
                                    >
                                   <i class="fas fa-comment"></i>
                                   </Text>
                                   </TouchableOpacity>
                                
                            </View>
                            </View>
                        </View>
                        {/* </Animated.View> */}
                        {/* <View 
                            style={{
                                justifyContent:"center",
                                alignItems:"center",
                                
                                maxHeight:33,
                                maxWidth:"100%",
                                width:'auto',
                                height:'auto'
                                
                            }}
                        >
        
                    </View> */}
                    
                    
                </View>
              </View>
            
           
        </Fade>
      )
    }
}
export default Message
