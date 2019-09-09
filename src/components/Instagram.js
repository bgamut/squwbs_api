import React, {Component,useCallback,useState,useRef,useEffect} from 'react'
import {Text,View,Dimensions,TouchableOpacity} from 'react-native'
import Dropzone, {useDropzone} from 'react-dropzone'
//import {Context} from '../context'
import Fade from 'react-reveal/Fade'
import XLSX from 'xlsx'
import stringifyObject from 'stringify-object'
const _ = require('lodash')

const withQuery = require('with-query');


const Instagram = (props)=> {
    const [current,setCurrent]=useState(0)
    const imgRef = useRef(null)
    useEffect(()=>{
        // fetch('https://squwbs.herokuapp.com/instagramuri', {
        //     credentials: "include"
        // })
        // .then(function(result){
        //     return result.json()
        // })
        // .then(function(json){
        //     console.log(json)
        //     var instagramuri=json.instagramuri
        //     console.log(instagramuri)
        //     fetch(instagramuri)
        //     .then(function(result){
        //         return result.json()
        //     })
        //     .then(function(json){
        //         console.log(json)
        //         var imageurl=json.data[0].images.standard_resolution.url;
        //         console.log(imageurl)
        //         imgRef.current.style.backgroundImage="url("+imageurl+")"
        //     })
            
        // })
        // .catch((err)=>{
        //     console.log(err)
        // })
        var instagramuri='https://api.instagram.com/v1/users/self/media/recent/?access_token=185265937.1677ed0.5722b610ef6b4cb085f67f62aff1abb5'
        console.log(instagramuri)
        fetch(instagramuri)
        .then(function(result){
            return result.json()
        })
        .then(function(json){
            console.log(json)
            var imageurl=json.data[0].images.standard_resolution.url;
            console.log(imageurl)
            imgRef.current.src=imageurl
        })
    },[])
        
    
      return (
        <Fade>
            
              <View class="container"
                style={{
                    width:"100%",
                    height:"100%",
                    backgroundColor:"grey",
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
                backgroundColor:'white',
                
                justifyContent:'center',
                alignItems:'center',
                // marginRight:8,
                // marginLeft:8,
                // marginBottom:2,
                borderRadius:4,
                borderBottom:2,
                borderTop:1,
                borderColor:'#aaa',
                borderStyle:'solid',
                overflow:'hidden',
                boxSizing:"border-box",
                shadowColor:'#000',
                shadowOpacity:0.25,
                shadowRadius:2,
                shadowOffset:{
                width:0,
                height:0
                },
                elevation:2
            }} >

      
                    {/* <div href="https://www.instagram.com/squwbs/?hl=ko" ref={imgRef}/> */}
                    
                    <a style={{           
                            textDecorationLine:'none',
                            textDecorationStyle:'none',
                            height:"100%",
                            width:"100%"
                          }} href="https://www.instagram.com/squwbs/?hl=ko" >
                      
                      
                    <View 
                        style={{

                            justifyContent:"center",
                            alignItems:"center",
                            background:'transparent'
                        }}
                    >
                    <img ref={imgRef}w
                        style={{
                            display:"block",
                            maxHeight:500,
                            // maxWidth:"61%",
                            width:'auto',
                            height:'auto'
                        }}
                    src="" alt=""/>
                    <View      
                        style={{
                            height:33,
                            justifyContent:'center',
                            alignItems:'center',
                            background:'transparent'
                        }}>
                    <i 
                        style={{           
                            height:33,
                            color:'grey',
                            display:'block',
                            margin:0,
                            shadowColor:'#000',
                            shadowOpacity:0.25,
                            shadowRadius:2,
                            shadowOffset:{
                            width:0,
                            height:0
                            },
                            elevation:2
                          }}
                      class="fab fa-instagram fa-4x">
                        
                      </i>
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
                      {/* <Text
                        style={{           
                            textDecorationLine:'none',
                            fontWeight:'700',
                            color:'grey',
                            fontSize: 16,
                            // textShadowColor: 'rgba(0, 0, 0, 1)',
                            // textShadowOffset: {width: 0, height: 0},
                            // textShadowRadius: 2,
                           
                            textAlign:'center',
                            alignItems:'center',
                            justifyContent:'center',
                            flexDirection:'row',
                            margin:0,
                            textDecorationStyle:'none'
                          }}
                      >
                          FOLLOW
                      </Text> */}
                    </View>
                    </a>
                    
                </View>
              </View>
            
            {/* <View style={{ 
                // height:100,
                //width:(Dimensions.get('window').width-8),
                width:200,
                backgroundColor:'white',
                
                flex:1,
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                // marginRight:8,
                // marginLeft:8,
                // marginBottom:2,
                borderRadius:4,
                borderBottom:2,
                borderTop:1,
                borderColor:'#aaa',
                borderStyle:'solid',
                overflow:'hidden',
                boxSizing:"border-box",
                shadowColor:'#000',
                shadowOpacity:0.25,
                shadowRadius:2,
                shadowOffset:{
                width:0,
                height:0
                },
                elevation:2
            }} 
                {...getRootProps({refKey:'innerRef'})}
            >
                <View style={{
                    height:33,
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <input {...getInputProps()} />
                    <TouchableOpacity>
                        <Text selectable={false} style ={{
                            fontSize: 11,
                            fontWeight:700,
                            textDecorationLine:'none',
                            color:'white',
                            
                            textShadowColor: 'rgba(128, 128, 128, 0.99)',
                            textShadowOffset: {width: 0, height: 0},
                            textShadowRadius: 3,
                            textAlign:'center',
                            alignItems:'center',
                            justifyContent:'center',
                            flexDirection:'row',
                            margin:5,
                        }}>
                            Select File
                        </Text>
                    </TouchableOpacity>
                </View>
            </View> */}
        </Fade>
      )
}
export default Instagram
