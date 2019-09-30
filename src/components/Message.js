

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



//var client

import './css/iconHover.css'
const line = require('@line/bot-sdk')
const withQuery = require('with-query').default;


const _ = require('lodash')




const Message = (props)=> {
  
    const [height,setHeight]=useState(0)
    const [width,setWidth]=useState(0)
    const [client,setClient]=useState()
    const [botID,setBotID]=useState('')
    const [content,setContent]=useState({})
    const inputRef = useRef(null)
    
    const [show,setShow]=useState('Show')
   

    const [textValue,setTextValue] = useState('')
    
    const handleKeyPress=(e)=>{
        
        setTextValue(e.target.value)
        
        //console.log(inputRef.current.value)
        
        if(e.key=='Enter'){
            e.preventDefault()
            handleSend()
            handleGet()
        }
        // console.log(e.key)
        
    }
    const handleChange=(e)=>{
        //console.log(e.target.value)
        //this.setState({value:e.target.value})
        setTextValue(e.target.value)
        
        handleGet()
    }
    const handleSend=(e)=>{
        console.log(textValue)
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
        
        fetch(withQuery('https://squwbs.herokuapp.com/linesendmessage', {
            text:textValue,
            mode:'cors'
        }))
        .then(result=>{
            setTextValue('')
            console.log(stringifyObject(result.message))
        })
        .catch((err)=>{
            console.error(err)
        })
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
        fetch(withQuery('https://squwbs.herokuapp.com/linegetmessage', {
            mode:'cors'
        }))
        .then(result=>{
            setContent({...content,...result.message})
            console.log('Message.js 122:',stringifyObject(result))
        })
        .catch((err)=>{
            console.error(err)
        })
    }

    const updateDimensions=()=>{
        setHeight(Dimensions.get('window').height)
        setWidth(Dimensions.get('window').width)
    }
  
    useEffect(()=>{
        fetch(withQuery('https://squwbs.herokuapp.com/line', {
           
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
        
    },[])

    useEffect(()=>{

        console.log(content)
    },[content])
      
    
      return (
        <Fade 
            when={show}
            duration={5}
            timeout={5}
        >
            
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
