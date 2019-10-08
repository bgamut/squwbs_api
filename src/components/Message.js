

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
//import * as firebase from 'firebase/app'
//import * as functions from 'firebase-functions'
//import * as admin from 'firebase-admin'
//import 'firebase/functions'
//import 'firebase/auth'
//import 'firebase/firestore'
//import * as functions from 'firebase-functions'

//var client

import './css/iconHover.css'

//import openSocket from 'socket.io-client';
// var net = require('node-net')
// var tcpClient = new net()
// console.log('Message.js 28:',tcpClient)

const line = require('@line/bot-sdk')
const withQuery = require('with-query').default;
const axios = require('axios')
//const io = require('socket.io')

//const functions = require('firebase-functions');
const _ = require('lodash')

// const firebase = require('firebase')
// var admin = require('firebase-admin')
// const functions = require('firebase-functions')








const Message = (props)=> {
    
    const [height,setHeight]=useState(0)
    const [width,setWidth]=useState(0)
    const [client,setClient]=useState()
    const [botID,setBotID]=useState('')
    const [content,setContent]=useState({})
    const [chatHistory,setChatHistory]=useState([])
    const inputRef = useRef(null)
    
    const [show,setShow]=useState('Show')
   

    const [textValue,setTextValue] = useState('')
    var refreshInterval
    const handleKeyPress=(e)=>{
        
        setTextValue(e.target.value)
        
        //console.log(inputRef.current.value)
        
        if(e.key=='Enter'){
            e.preventDefault()
            handleSend()
            //handleGet()
        }
        // console.log(e.key)
        
    }
    const handleChange=(e)=>{
        //console.log(e.target.value)
        //this.setState({value:e.target.value})
        setTextValue(e.target.value)
        
        
    }
    const handleSend=()=>{
        let message=textValue
        let topic='chat'
        console.log(textValue)
        // let cancel
        // axios({
        //     method:'GET',
        //     url:'https://squwbs-252702.appspot.com/firebaseMessage',
        //     params:{
        //         message:message,
        //         topic:topic
        //     },
        //     // cancelToken: new axios.CancelToken((c)=>{cancel=c})
        // })
        // .then(function(response){
        //     console.log('message 79 response:',response)
        // })
        // .catch(function(error){
        //     console.log('message 82 err:',error)
        // })
        // axios({
        //     method:'GET',
        //     url:'https://squwbs-252702.appspot.com/saysomething',
        //     params:{
        //         message:message,
        //     },
        //     // cancelToken: new axios.CancelToken((c)=>{cancel=c})
        // })
        var body={message:message}
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

        setTextValue('')
        //return ()=>cancel()

        // client.pushMessage(botID,textValue)
        //     .then(()=>{console.log('message sent')})
        //     .catch((err)=>{console.log(err)})
        // client.pushMessage(
        //     NODE_ENV.LINE_MY_USER_ID,
        //     {
        //       type:'text',
        //       text:req.text
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
        
        // fetch(withQuery('https://squwbs-252702.appspot.com/linesendmessage', {
        //     text:textValue,
        //     mode:'cors'
        // }))
        // .then(result=>{
        //     setTextValue('')
        //     console.log(stringifyObject(result.message))
        // })
        // .catch((err)=>{
        //     console.error(err)
        // })

        
    }

    const handleGet=(e)=>{
        //console.log(textValue)
        // client.pushMessage(botID,textValue)
        //     .then(()=>{console.log('message sent')})
        //     .catch((err)=>{console.log(err)})
        // client.pushMessage(
        //     NODE_ENV.LINE_MY_USER_ID,
        //     {
        //       type:'text',
        //       text:req.text
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
        // fetch(withQuery('https://squwbs-252702.appspot.com/linegetmessage', {
        //     mode:'cors'
        // }))
        // .then(result=>{
        //     setContent({...content,...result.message})
        //     console.log('Message.js 123:',stringifyObject(result))
        // })
        // .catch((err)=>{
        //     console.error(err)
        // })
        // const line = require('@line/bot-sdk');

        
        
        // client.getMessageContent('1627253899')
        // .then((stream) => {
        //     stream.on('data', (chunk) => {
        //     console.log(chunk)
        //     });
        //     stream.on('error', (err) => {
        //     // error handling
        //     });
        // });

        
         
    }

    const updateDimensions=()=>{
        setHeight(Dimensions.get('window').height)
        setWidth(Dimensions.get('window').width)
    }
    const handleLoad=()=>{
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
                })
                // document.addEventListener('firebaseTokenReceived',function(event){
                //     console.log("Token from message.js 180: ",event.detail.message)
                // })
                window.addEventListener("beforeunload",function(e){
                    fetch('https://squwbs-252702.appspot.com/logout')
                    .then(()=>{
                        console.log('successfully logged out')
                    })
                    .catch((err)=>{
                        console.log('logout error : ',err)
                    })
                    //tcpClient.destroy()
                    clearInterval(refreshInterval)
                })
            } 
            
        }
        attachit()
        
    }
    useEffect(()=>{
        console.log('chatHistory updated')
    },[chatHistory])
    useEffect(()=>{
        fetch(withQuery('https://squwbs-252702.appspot.com/line', {
           
            mode:'cors'
        }))
        .then(result=>{
            console.log('got result from user fetch')
            return result.json()
            })
        .then((json)=>{
        //setState({...state,userData:{...json}})
        setClient(new line.Client({
            channelAccessToken:json.token
        }))
        setBotID(json.id)
        console.log(stringifyObject(json))
        return json
        })
        .catch((err)=>{
        console.error(err)
        })
        Dimensions.addEventListener('change',(e)=>{
            updateDimensions()
        })
        
        updateDimensions()
        //handleGet()
        console.log('fcm addEventListener test')
        window.addEventListener('load',handleLoad())
       
        
        //const socket = openSocket('https://squwbs-252702.appspot.com/8080');
        //const socket = io('https://squwbs-252702.appspot.com/8080')
        //const socket = io()
        // socket.on('chat-message',data=>{
        //     console.log("message.js 242:",data)
        // })
        //socket.emit('chat message','first message from message.js!')
        // admin.initializeApp({
        //     //credential:admin.credential.cert(firebaseServiceKey),
        //     credential:admin.credential.applicationDefault(),
        //     databaseURL:'https://assistant-569a2.firebaseio.com'
        //   })
        //   functions.database 
        //     .ref('/chat')
        //     .onWrite((change,context)=>{
        //     console.log('firebase function fired from message.js 258',change.after.val())
        //   })

        //var defaultProject = firebase.initializeApp(firebaseConfig)
        //defaultProject.firestore().onUpdate(change=>)
        //console.log('ready to be disappointed',defaultProject.functions())

        // var defaultFunctions= defaultProject.functions()
        // admin.initializeApp()
        // functions.database 
        //     .ref('/chat/{pushId}/chat')
        //     .onUpdate((change,context)=>{
        //     console.log('firebase function fired from message.js 298',change.after.val())
        // })
        // functions.database
        //     .ref('chat/{pushId}/chat')
        //     .onCreate((snapshot,context)=>{
        //         const original = snapshot.val()
        //         console.log('firebase function fired from message.js 304',original)
        //     })
        
        // tcpClient.connect(1337,'https://squwbs-252702.appspot.com/',function(){
        //     console.log('message.js 303 : connected net.Socket()' )
        //     tcpClient.write('hello, server!')
        // })
        // tcpClient.on('data',function(data){
        //     console.log('Received data from server! : ' + data)
        // })
        fetch('https://squwbs-252702.appspot.com/fccapikey')
            .then((result)=>{
                console.log('message.js 317', result.json)
                return result.json
            })
            .then((json)=>{
                // firebase.initializeApp(json)
                // console.log('this is from firebase initialized message.js 322:',json)
                
                // console.log(functions)
                // functions.firestore.document('/data/user').onUpdate((change)=>{
                //     const after = change.after.data()
                //     console.log('message.js 328 : ', after)
                // })
            })
            .catch((err)=>{
                console.log(err)
            })
        
        
        function updateMessages(){
            fetch(withQuery('https://squwbs-252702.appspot.com/socket.io', {
                mode:'cors'
            }))
            .then((result)=>{
                //console.log('Message.js 317 got result from socket.io fetch')
                return result.json()
            })
            .then((json)=>{
                console.log(json)
                setChatHistory(json.chatHistory)
                //console.log('Message.js 317 :',json)
            })
            .catch((err)=>{
                //console.error(err)
            })
        }
        refreshInterval = setInterval(updateMessages,15000)
        
    },[])

    useEffect(()=>{

        console.log(content)
    },[content])
    const createChatList = (chatHistory) =>{
        let parent = []
        //var length=this.state.posts.length
        chatHistory.map((chat)=>{
          //console.log(sentence)
          //if(i==length){
            parent.push(
            <View>
              <Text
                  style ={
                    {
                        textDecorationLine:'none',
                        color:'rgb(0,0,0)',
                        backgroundColor:'transparent',
                        fontSize: 14,
                        fontWeight:'700',
                        marginLeft:5,
                        marginRight:5,
                        textAlign:'left',
                        alignItems:'center',
                        justifyContent:'flex-start',
                        flexDirection:'row',
                    }
                }
              >
                  {/* chat.userProvier && chat.user */}
                  {chat.chat}
              </Text>
            </View>
          )
         
        })
        return parent;
    } 
    
      return (
        <Fade 
            when={show}
            duration={5}
            timeout={5}
        >
            {/* <P5Wrapper /> */}
              <View class="container"
                style={{
                    width:width-50,
                    height:height,
                    backgroundColor:"transparent",
                    justifyContent:'center',
                    alignItems:'center',
                    flexDirection:'row'
                }}
            >
                <View 
                style={{ 

                width:width,
                height:height-50,
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
                                height:height-175,
                                width:width-30,
                                //justifyContent:'center',
                                alignItems:'center'
                            }}
                        >
                        <View
                            style={{
                                display:'absolute',
                                backgroundColor:'white',
                                height:height-181,
                                width:width-30,
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
                                height:height-400,
                                width:width-60,

                            }}
      
                            onScroll={(e)=>{
                                //onScroll(e)
                              }
                            }
                            scrollEnabled={true}
                            scrollEventThrottle={16}
                            showsVerticalScrollIndicator={true}
                            snapToInterval={height-50}
                            snapeToAlignment='end'
                            decelerationRate="fast"
                        >
                            {/* <Text>
                                {chatHistory}
                            </Text> */}
                            {createChatList(this.state.chatHistory)}
                        </ScrollView>
                        </View>
                        </View>
                        <View
                            style={{

                                justifyContent:"center",
                                alignItems:"center",
                                backgroundColor:'transparent',
                                height:50,
                                width:width-60,
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
                                width:width-60,
                                flexDirection:'row',
                                justifyContent:'center',
                                overflow:'hidden'
                            }}
                        >


                        
                            
                        <textarea id='text-input'type='text' spellCheck="false" 
                            ref={inputRef}
                            value={textValue}

                            style={{
                                // height:height-70,
                                // width:width/2-50,
                                caretColor:'lightgrey',
                                height:39,
                                width:width-100,
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
                            onKeyPress={handleKeyPress}
                            onChange={handleChange}

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
                                    onPress={handleSend}
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
export default Message
