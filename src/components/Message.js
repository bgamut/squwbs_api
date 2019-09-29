

import React, {Component,useCallback,useState,useRef,useEffect} from 'react'
import {Text,View,Dimensions,TouchableOpacity,Image,Animated,Easing} from 'react-native'
import Dropzone, {useDropzone} from 'react-dropzone'
//import {Context} from '../context'
import Fade from 'react-reveal/Fade'
import XLSX from 'xlsx'
import stringifyObject from 'stringify-object'
//import {swing} from "react-animations"
//import styled, { keyframes } from 'styled-components'
import Radium, {StyleRoot} from 'radium'
import iglogo from './icons/iglogo.svg'
const line = require('@line/bot-sdk')
//var client
import './css/Wiggle.css'
import './css/Image.css'
// const SwingAnimation = keyframes'${Swing}';
// const SwingDiv = styled.div'
//   animation: infinite 5s ${SwingAnimation};';
const styles={
    swing:{
        animation:'infinite 5s',
        animationName:Radium.keyframes(swing,'swing')
    }
}

const _ = require('lodash')

const withQuery = require('with-query');


const Message = (props)=> {
  
    const [height,setHeight]=useState(0)
    const [width,setWidth]=useState(0)
    const [client,setClient]=userState(null)
    const [botID,setBotID]=userState('')
    const inputRef = useRef(null)
    
    const [show,setShow]=useState('Show')
   

    const [textValue,setTextValue] = useState('')
    
    const handleKeyPress=(e)=>{
        
        setTextValue(e.target.value)
        
        console.log(inputRef.current.value)
        console.log(e.key)
    }
    const handleChange=(e)=>{
        //console.log(e.target.value)
        //this.setState({value:e.target.value})
        setTextValue(e.target.value)
        
    }
    const handleSend=(e)=>{
        console.log(textValue)
        client.pushMessage(botID,textValue)
            .then(()=>{console.log('message sent')})
            .catch((err)=>{console.log(err)})
    }
    const updateDimensions=()=>{
        setHeight(Dimensions.get('window').height)
        setWidth(Dimensions.get('window').width)
    }
  
    useEffect(()=>{
        fetch(withQuery('https://squwbs.herokuapp.com/line', {
            ...obj,
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

                                justifyContent:"center",
                                alignItems:"center",
                                backgroundColor:'transparent',
                                height:height-150,
                                width:width-150,
                                //opacity:opacity
                                //maxWidth:width-600
                                //paddingTop:0,
                            }}
                        >
   
                            
   <textarea id='text-input'type='text' spellCheck="false" 
                            ref={inputRef}
                            value={textValue}

                            style={{
                                // height:height-70,
                                // width:width/2-50,
                                height:"88%",
                                width:"97%",
                                fontSize:13,
                                lineHeight:'2em',
                                paddingTop:35,
                                paddingLeft: 25,
                                paddingRight: 25,
                                paddingBottom:35,
                                borderLeftWidth:1,
                                borderLeftColor:'lightgrey',
                                borderRightColor:'white',
                                borderBottomColor:'white',
                                borderTopColor:'white',
                                backgroundColor:'transparent',
                                resize:'none',
                                outlineColor: 'transparent',
                                outlineStyle: 'none'
                            }} 
                            onKeyPress={handleKeyPress}
                            onChange={handleChange}

                            >
                        </textarea> 
                        
                            <View      
                                style={{
                                    height:39,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    backgroundColor:'transparent'
                                }}>
                                <TouchableOpacity
                                    onPress={handleSend}
                                >
                                   <i class="fas fa-comment"></i>
                                   </TouchableOpacity>
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
