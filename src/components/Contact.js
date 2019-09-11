import React, {Component,useCallback,useState,useRef,useEffect} from 'react'
import {Text,View,Dimensions,TouchableOpacity} from 'react-native'
import Dropzone, {useDropzone} from 'react-dropzone'
//import {Context} from '../context'
import Fade from 'react-reveal/Fade'
import XLSX from 'xlsx'
import stringifyObject from 'stringify-object'
const _ = require('lodash')

const withQuery = require('with-query');


const Contact = (props)=> {
    
    
      return (
        <Fade>
            
              <View class="container"
                style={{
                    width:"100%",
                    height:"100%",
                    backgroundColor:"transparent",
                    justifyContent:'center',
                    alignItems:'center',
                    flexDirection:'row'
                }}
            >
                <View 
                style={{ 
                // height:100,
                //width:(Dimensions.get('window').width-8),
                width:"100%",
                height:"100%",
                flexDirection:'column',
                padding:15,
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

      
                    {/* <div href="https://www.Contac.com/squwbs/?hl=ko" ref={imgRef}/> */}
                    
                    <a style={{           
                            textDecorationLine:'none',
                            textDecorationStyle:'none',
                            height:"100%",
                            width:"100%"
                          }} href="mailto:bernardahn@squwbs.com" >
                      
                      
                    <View 
                        style={{

                            justifyContent:"center",
                            alignItems:"center",
                            background:'transparent'
                        }}
                    >
                   
                  
                    {/* <Text
                        style={{
                           
                            fontWeight:700,
                            textDecorationLine:'none',
                            color:'white',
                            fontSize: 13,
                            // textShadowColor: 'rgba(0, 0, 0, 0.5)',
                            // textShadowOffset: {width: 0, height: 0},
                            // textShadowRadius: 3,
                        }}
                    >
                        Contact
                    </Text> */}
               
                    <View      
                        style={{
                            height:'100%',
                            width:'100%',
                            justifyContent:'center',
                            alignItems:'center',
                            background:'transparent'
                        }}>
                    <i 
                    style={{           
                        height:45,
                        color:'white',
                        display:'block',
                        margin:0,
                        shadowColor:'#000',
                        shadowOpacity:0.25,
                        shadowRadius:2,
                        shadowOffset:{
                        width:0,
                        height:0
                        },
                        fontSize:45,
                        elevation:2,
                        textShadowColor: 'rgba(0, 0, 0, 0.5)',
                        textShadowOffset: {width: 0, height: 0},
                        textShadowRadius: 8,
                      }}class="material-icons large white-text">email</i>
                    </View>
                    </View>
                        <View 
                            style={{
                                justifyContent:"center",
                                alignItems:"center",
                                
                                maxHeight:33,
                                maxWidth:"100%",
                                width:'auto',
                                height:'auto'
                                
                            }}
                        >
        
                    </View>
                    </a>
                    
                </View>
              </View>
            
           
        </Fade>
      )
}
export default Contact
