

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
