

import React, {Component,useCallback,useState,useRef,useEffect} from 'react'
import {Text,View,Dimensions,TouchableOpacity,Image,Animated,Easing,ScrollView,StyleSheet} from 'react-native'
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








class Kakao extends Component{
    
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
            parent:[],
            kakaoJSON:{}
        }
        this.inputRef = React.createRef()
        

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

      
        //this.setState({textValue:''})
        //this.inputRef.current.focus()
        
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
                })
                // document.addEventListener('firebaseTokenReceived',function(event){
                //     console.log("Token from message.js 180: ",event.detail.message)
                // })
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
            } 
            
        }
        attachit()
        
    }
    updateMessages = () =>{
        //let parent = []

        fetch(withQuery('https://squwbs-252702.appspot.com/socket.io', {
            mode:'cors'
        }))
        .then((result)=>{
            
            return result.json()
        })
        .then((json)=>{
            //console.log(json.chatHistory)
            var newChatHistory = []
            for (var i=0; i<Object.keys(json.chatHistory).length; i++){
                newChatHistory.push(json.chatHistory[i])
            }
            console.log('messageV2 179:',newChatHistory)
            

            var newParent=[]
            newChatHistory.map((chat,i,arr)=>{

                //var newParent = this.state.parent.slice()
                newParent.push(
                <View
                    style={{
                        //height:50,
                        width:"100%",
                        backgroundColor:'white'
                    }}
                >
                    <Text
                        style ={
                        {
                            textDecorationLine:'none',
                            color:'grey',
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
                // this.setState({parent:newParent},()=>{
                //     //this.forceUpdate()
                //     //console.log(this.state.chatHistory)
                //     //console.log('messageV2.js 218:',this.state.parent)
                //     setTimeout(this.createChatList,15000)
                // //return parent; 
                // })
                this.setState({parent:newParent},()=>{
                    //setTimeout(this.createChatList,15000)
                })
            })


                
            
            
           
        })
        .catch((err)=>{
           
        })
        
    }
    componentDidMount(){
        // Dimensions.addEventListener('change',(e)=>{
        //     this.updateDimensions()
        // })
        // this.updateDimensions()
        // window.addEventListener('load',this.handleLoad())
        
        // const refreshInterval=()=>{
        //     setInterval(this.updateMessages,15000)
        // }
        // window.addEventListener("beforeunload",function(e){
        //     fetch('https://squwbs-252702.appspot.com/logout')
        //     .then(()=>{
        //         console.log('successfully logged out')
        //     })
        //     .catch((err)=>{
        //         console.log('logout error : ',err)
        //     })
            
        //     clearInterval(refreshInterval())
        // })
        
        // //this.createChatList()
        // refreshInterval()
        // Kakao.init('f670409648dd08dc926863a867dbd297')
        // console.log(Kakao)
        

        // fetch('https://kauth.kakao.com/oauth/authorize',
        //     {
        //         'method':'GET',
        //         'Authorization': 'KakaoAK 3f8eaabc9161b6f392c0999b7fce6026',
        //         'Content-Type':'Access-Control-Allow-Origin'
        //     }
 
        // )
        // fetch(withQuery('https://kauth.kakao.com/oauth/token', {
            // client_id:'3f8eaabc9161b6f392c0999b7fce6026',
            // redirect_url:'squwbs.com',
            // headers:{
            // // 'User-Agent': 'Super Agent/0.0.1',
            // 'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
            // //'Authorization': 'KakaoAK '+'3f8eaabc9161b6f392c0999b7fce6026',
            // },
            // //code:'code'
            // response_type:'code'
        // }))
        // fetch('https://squwbs-252702.appspot.com/readCookies')
        // .then(function(response){
            
        //     //console.log('kakao 263 response:',response)
        //     return response.json
        // })
        // .then(function(json){
        //     console.log('kakao 280:',json)
        // })
        // .catch(function(error){
        //     console.log('kakao 266 err:',error)
        // })
        var urlParams = window.location.search
        console.log('typeOf urlParams',typeof(urlParams))
        console.log('urlParams',urlParams)
        if(urlParams!=undefined && urlParams!=''){
            var getQuery = urlParams.split('?')[1]

        var params = getQuery.split('&') 
        for (var i=0; i<params.length; i++){
            
            if(params[i].includes('code=')){
                if(params[i].indexOf('code=')==0){
                    console.log('Kakao.js 292 : ',params[i].replace('code=',''))
                    var replacer = params[i].replace('code=','')
                    // this.setState({kakaoCode:params[i].replace('code=','')},()=>{
                        // var headers = {
                        //     'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                        //     // 'Cache-Control':'no-cache'
                        // }
                        // var body = {}
                        // body.grant_type ='authorization_code'
                        // body.client_id='3f8eaabc9161b6f392c0999b7fce6026'
                        // body.redirect_uri='https://squwbs-252702.appspot.com'
                        // //body.code = kakaoCode
                        // body.code=params[i].replace('code=','')
                        // body.client_secret='Rkqe5P8ctpl7rccHg2DP4RcqYog0yZte'
                        // fetch('https://kauth.kakao.com/oauth/token',{
                        //     method:'post',
                        //     headers:headers,
                        //     body:JSON.stringify(body)
                        // })

                        // fetch(withQuery('https://kauth.kakao.com/oauth/token',{
                        //     headers:headers,
                        //     grant_type :'authorization_code',
                        //     client_id:'3f8eaabc9161b6f392c0999b7fce6026',
                        //     redirect_uri:'https://squwbs-252702.appspot.com',
                        //     //body.code = kakaoCode
                        //     code:params[i].replace('code=','')
                        // }))
                    //     .then((res)=>{
                    //         return res.json()
                    //     })
                    //     .then((json)=>{
                    //         this.setState({kakaoJSON:json},()=>{
                                
                    //             console.log('kakaoJSON updated!')
                    //         })
                    //         //error returns the following
                    //             //{error: "invalid_client", error_description: "Bad client credentials"}
                    //         console.log('kakao.js 309 : ',json)
                    //     })
                    //     .catch((err)=>{
                    //         console.log('kakao.js 312 : ',err)
                    //     })
                    // // })
                    //fetch(withQuery('https://squwbs-252702.appspot.com/kakao'),{
                    var code = params[i].replace('code=','')
                    setTimeout(()=>{
                        console.log('Kakao.js 343 code : ',code)
                        // fetch(withQuery('https://squwbs.pythonanywhere.com/oauth',{
                        //     code:code
                        // }))
                        var headers = {
                            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                            'Cache-Control':'no-cache'
                        }
                        fetch(withQuery('https://kauth.kakao.com/oauth/token',{
                            headers:headers,
                            grant_type :'authorization_code',
                            client_id:'3f8eaabc9161b6f392c0999b7fce6026',
                            //redirect_uri:'https://squwbs-252702.appspot.com',
                            redirect_uri:'http://squwbs.com',
                            client_secret:'Rkqe5P8ctpl7rccHg2DP4RcqYog0yZte',
                            //body.code = kakaoCode
                            code:code
                        }))
                        // var body={code:code}
                        // fetch('https://kauth.kakao.com/oauth/token',{
                        //     method:'post',
                        //     //headers:headers,
                        //     body:JSON.stringify(body)
                        // })
                        .then((res)=>{
                            return res.json()
                        })
                        .then((json)=>{
                            this.setState({kakaoJSON:json},()=>{
                                
                                console.log('kakaoJSON updated!')
                                // var headers = {
                                //     'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                                //     'Cache-Control':'no-cache'
                                // }
                                // var token= this.state.kakaoJSON.access_token
                                // var url = "https://kapi.kakao.com/v1/api/talk/friends"
                                // var bearer = 'Bearer '+token
                                // headers["Authorization"]=bearer
                                // fetch(url,{headers})
                                // fetch(withQuery('https://squwbs-252702.appspot.com/kakao',{
                                fetch(withQuery('http://squwbs.herokuapp.com/kakao',{
                                    token:this.state.kakaoJSON.access_token
                                }))
                                .then((result)=>{
                                    return result.json()
                                })
                                .then((json)=>{
                                    console.log('Kakao.js 386 friends list : ',stringifyObject(json))
                                })
                                .catch((err)=>{
                                    console.log(err)
                                })

                            })
                            
                            console.log('kakao.js 309 : ',json)
                        })
                        .catch((err)=>{
                            console.log('kakao.js 312 : ',err)
                        })
                        
                    },3000)
                    
                }
            }

        }
        }
        
    }

    
    
        
    
    render(){
      return (
        // Kakao.Auth.createLoginButton({
        //     container: '#kakao-login-btn',
        //     success: function(authObj) {
        //         alert(JSON.stringify(authObj));
        //     },
        //     fail: function(err) {
        //         alert(JSON.stringify(err));
        //     }
        // })
        
            <TouchableOpacity 
            //onPress={props.ShowSlidingDrawer}
            style={styles.touch}
            >
                <a 
        style={
            {
              textDecorationLine:'none',
              margin:0,
              padding:0,
              backgroundColor:'transparent',
              fontSize: 17,
              fontWeight:'700',
              textShadowColor: 'rgba(0, 0, 0, 0.5)',
              textShadowOffset: {width: 0, height: 0},
              textShadowRadius: 2,
              height:45,
              alignItems:'center',
              justifyContent:'center',
              flexDirection:'row',
              textAlign:'center'
            }
          }
        href="https://kauth.kakao.com/oauth/authorize?client_id=3f8eaabc9161b6f392c0999b7fce6026&redirect_uri=http://squwbs.com&response_type=code">
        {/* href="https://kauth.kakao.com/oauth/authorize?client_id=3f8eaabc9161b6f392c0999b7fce6026&redirect_uri=https://squwbs-252702.appspot.com&client_secret=Rkqe5P8ctpl7rccHg2DP4RcqYog0yZte&response_type=code"> */}
                <Text id="Contact" 
                style={{

                    textDecorationLine:'none',
                    color:'white',
                    fontWeight:'700',
                    fontSize: 17,
                    textShadowColor: 'rgba(0, 0, 0, 0.5)',
                    textShadowOffset: {width: 0, height: 0},
                    textShadowRadius: 2,
                    textAlign:'center',
                    alignItems:'center',
                    justifyContent:'center',
                    flexDirection:'row',
                }}
                >
                    KAKAO LOGIN
                </Text>
                </a>
            </TouchableOpacity>
        
      )
    }
}
const styles = StyleSheet.create({
  
    box:{
      margin:0,
      //padding:1,
      height:45,
      backgroundColor:'transparent',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row',
      // flex:1,
      //fontSize:12,
      //borderColor:'black',
      //borderRadius:2,
      //fontWeight:'700',
      //color:'black',
      // textShadowColor: 'rgba(1, 1, 1, 1)',
      // textShadowOffset: {width: 0, height: 0},
      // textShadowRadius: 20,
      //borderColor:'#cfcfcf',
      //borderWidth:1,
    },
    touch:{
      margin:0,
      //padding:1,
      //fontWeight:700,
      height:22,
      backgroundColor:'transparent',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row',
      // flex:1
    },
    link:{
      fontWeight:'700',
      color:'black', 
      textDecorationLine:'none',
      //borderColor:'black',
      //borderWidth:1 
    }
        
})
export default Kakao
