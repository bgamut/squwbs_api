import React, {useCallback,useState,useRef,useEffect} from 'react'
import {Text,View,Dimensions,TouchableOpacity} from 'react-native'
import Dropzone, {useDropzone} from 'react-dropzone'
//import {Context} from '../context'
import Fade from 'react-reveal/Fade'
import XLSX from 'xlsx'
import stringifyObject from 'stringify-object'
import {swing} from "react-animations"
//import styled, { keyframes } from 'styled-components'
import Radium, {StyleRoot} from 'radium'
import envelope from './icons/close-envelope.svg'

import './css/Wiggle.css'
import './css/Image.css'
// const SwingAnimation = keyframes'${Swing}';
// const SwingDiv = styled.div'
//   animation: infinite 5s ${SwingAnimation};';
const stylez={
    swing:{
        animation:'infinite 5s',
        animationName:Radium.keyframes(swing,'swing')
    }
}
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
                    flexDirection:'column'
                }}
            >
                <View 
                style={{ 
                // height:100,
                //width:(Dimensions.get('window').width-8),
                width:500,
                height:250,
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
                            width:"100%",
                            
                          }} href="mailto:bernardahn@squwbs.com" >
                      
                      
                    <View 
                        style={{

                            justifyContent:"center",
                            alignItems:"center",
                            //backgroundColor:'transparent',
                            backgroundColor:'transparent',
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
                            backgroundColor:'transparent'
                        }}>
                    {/* <StyleRoot> */}
                    {/* <i 
                    style={[{           
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
                      },{...stylez.swing}]}className="material-icons large white-text">email</i> */}
                      {/* </StyleRoot> */}
                      {/* <Text
                        style={{
                           
                            fontWeight:700,
                            textDecorationLine:'none',
                            color:'white',
                            fontSize: 13,
                            marginLeft:5,
                            // textShadowColor: 'rgba(0, 0, 0, 0.5)',
                            // textShadowOffset: {width: 0, height: 0},
                            // textShadowRadius: 3,
                        }}
                    >
                        bernardahn@squwbs.com
                    </Text>  */}
                    {/* <img 
                    //  className="Wiggle Unselectable" 
                        className="Unselectable"
                        src={envelope}
                        
                        unselectable='on'
                        style={{           
                        height:25,
                        width:25,
                        color:'white',
                        filter:'invert(1)',
                        // display:'block',
                        // margin:0,
                        // shadowColor:'#000',
                        // shadowOpacity:0.25,
                        // shadowRadius:2,
                        // shadowOffset:{
                        // width:0,
                        // height:0
                        // },
                        // fontSize:45,
                        // elevation:2,
                        // textShadowColor: 'rgba(0, 0, 0, 0.5)',
                        // textShadowOffset: {width: 0, height: 0},
                        // textShadowRadius: 8,
                      
                      
                      //backgroundSize: '100% 100%',
                      
                      textAlign:'center',
                     
                      //backgroundRepeat:"no-repeat",
                    }}
                      /> */}
                    <View
                     style={{
                         flexDirection:'column',
                         backgroundColor:'transparent',
                         alignItems:'center',
                         justifyContent:'center'
                     }}
                    >
                    <Text
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
                        <View
                            style={{
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:'transparent'
                            }}
                        >
                            <i class="fas fa-envelope"></i>
                        </View>
                        
                    </Text>
                    <View
                        style={{
                            height:'100%',
                            weight:330,
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:'transparent'
                        }}
                    >
                    
                    <Text
                        style={{
                           
                            fontWeight:700,
                            textDecorationLine:'none',
                            color:'white',
                            fontSize: 13,
                            marginLeft:5,
                            // textShadowColor: 'rgba(0, 0, 0, 0.5)',
                            // textShadowOffset: {width: 0, height: 0},
                            // textShadowRadius: 3,
                        }}
                    >
                        bernardahn@squwbs.com
                    </Text> 
                    </View>
                </View>
                </View>
                    </View>
                    

                    </a>
                    <a
                        style={{
                            textDecorationLine:'none',
                            textDecorationStyle:'none',
                            height:"100%",
                            width:"100%"
                        }}
                    href="tel:821055981367">
                    <View
                     style={{
                        flexDirection:'column',
                        backgroundColor:'transparent',
                        alignItems:'center',
                        justifyContent:'center'
                     }}
                    >
                    <Text
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
                        <View
                            style={{
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:'transparent'
                            }}
                        >
                            <i class="fas fa-phone"></i>
                        </View>
                        
                    </Text>
                    <Text
                        style={{
                           
                            fontWeight:700,
                            textDecorationLine:'none',
                            color:'white',
                            fontSize: 13,
                            marginLeft:5,
                            // textShadowColor: 'rgba(0, 0, 0, 0.5)',
                            // textShadowOffset: {width: 0, height: 0},
                            // textShadowRadius: 3,
                        }}
                    >
                        821055981367
                    </Text> 
                </View>
                </a>
                <a style={{           
                            textDecorationLine:'none',
                            textDecorationStyle:'none',
                            height:"100%",
                            width:"100%"
                          }} href="https://goo.gl/maps/wovCEykLbfhgtTQz8" >
                      
                      
                    <View 
                        style={{

                            justifyContent:"center",
                            alignItems:"center",
                            backgroundColor:'transparent'
                        }}
                    >
                   
                  
                    
                    <View    
                        style={{
                            height:'100%',
                            width:'100%',
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:'transparent'
                        }}>
                   
                    <View
                     style={{
                         flexDirection:'column',
                         backgroundColor:'transparent',
                         alignItems:'center',
                         justifyContent:'center'
                     }}
                    >
                    <Text
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
                        <View
                            style={{
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:'transparent'
                            }}
                        >
                            <i class="fas fa-home"></i>
                        </View>
                        
                    </Text>
                    <Text
                        style={{
                           
                            fontWeight:700,
                            textDecorationLine:'none',
                            color:'white',
                            fontSize: 13,
                            marginLeft:5,
                            // textShadowColor: 'rgba(0, 0, 0, 0.5)',
                            // textShadowOffset: {width: 0, height: 0},
                            // textShadowRadius: 3,
                        }}
                    >
                       302-1302 213 bungil 5 
                    </Text>
                    <Text
                        style={{
                           
                            fontWeight:700,
                            textDecorationLine:'none',
                            color:'white',
                            fontSize: 13,
                            marginLeft:5,
                            // textShadowColor: 'rgba(0, 0, 0, 0.5)',
                            // textShadowOffset: {width: 0, height: 0},
                            // textShadowRadius: 3,
                        }}
                    >
                        Jeongjail-ro Bundang-gu
                        </Text>
                        <Text
                            style={{
                            
                                fontWeight:700,
                                textDecorationLine:'none',
                                color:'white',
                                fontSize: 13,
                                marginLeft:5,
                                // textShadowColor: 'rgba(0, 0, 0, 0.5)',
                                // textShadowOffset: {width: 0, height: 0},
                                // textShadowRadius: 3,
                            }}
                        >
                        Seongnam-si Gyeonggi-do
                        </Text>
                        <Text
                            style={{
                            
                                fontWeight:700,
                                textDecorationLine:'none',
                                color:'white',
                                fontSize: 13,
                                marginLeft:5,
                                // textShadowColor: 'rgba(0, 0, 0, 0.5)',
                                // textShadowOffset: {width: 0, height: 0},
                                // textShadowRadius: 3,
                            }}
                        >
                         R.O.K 13556
                    </Text> 
                </View>
                </View>
                    </View>
                    

                    </a>
                </View>
              </View>
            
           
        </Fade>
      )
}
export default Contact