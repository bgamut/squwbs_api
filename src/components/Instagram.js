import React, {Component,useCallback,useState,useRef,useEffect} from 'react'
import {Text,View,Dimensions,TouchableOpacity,Image} from 'react-native'
import Dropzone, {useDropzone} from 'react-dropzone'
//import {Context} from '../context'
import Fade from 'react-reveal/Fade'
import XLSX from 'xlsx'
import stringifyObject from 'stringify-object'

const _ = require('lodash')

const withQuery = require('with-query');


const Instagram = (props)=> {
    const [current,setCurrent]=useState(0)
    const [height,setHeight]=useState(0)
    const [width,setWidth]=useState(0)
    const [uri,setUri]=useState('')
    const imgRef = useRef(null)
    const updateDimensions=()=>{
        setHeight(Dimensions.get('window').height)
        setWidth(Dimensions.get('window').width)
    }
        
    useEffect(()=>{
        //console.log('width:'+width+' height:'+height)
        if(width>=height){
            //console.log('landscape')
            imgRef.current.height=Dimensions.get('window').height-150
        }
        else{
            //console.log('portrait')
            imgRef.current.height=Dimensions.get('window').height-300
        }
        //console.log(imgRef.current.height)
        
    },[height,width])
    useEffect(()=>{
        fetch('https://squwbs.herokuapp.com/instagramuri'
            // , {
            //     credentials: "include"
            // }
        )
        .then(function(result){
            return result.json()
        })
        .then(function(json){
            //console.log(json)
            var instagramuri=json.instagramuri
            //console.log(instagramuri)
            fetch(instagramuri)
            .then(function(result){
                return result.json()
            })
            .then(function(json){
                //console.log(json)
                var imageurl=json.data[0].images.standard_resolution.url;
                //console.log(imageurl)
                setUri(imageurl)
                imgRef.current.src=imageurl
                
                // imgRef.setNativeProps({
                //     source:[{uri:imageurl}]
                // })
                // console.log(imgRef.source)
                
            })
            
        })
        .catch((err)=>{
            console.log(err)
        })
        //window.addEventListener("resize", updateDimensions);
        //window.addEventListener('orientationchange', updateDimensions)
        //setHeight(Math.floor(Dimensions.get('window').height)-300)
        Dimensions.addEventListener('change',(e)=>{
            updateDimensions()
        })
        updateDimensions()
    },[])
  

        
      
    
      return (
        <Fade>
            
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
                // height:100,
                //width:(Dimensions.get('window').width-8),
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

      
                    {/* <div href="https://www.instagram.com/squwbs/?hl=ko" ref={imgRef}/> */}
                    
                   
                      
                      
                        <View 
                            style={{

                                justifyContent:"center",
                                alignItems:"center",
                                background:'transparent',
                                height:height-50,
                                width:width-150,
                                maxWidth:width-600
                                //paddingTop:0,
                            }}
                        >
                            
                                <img ref={imgRef}
                                    style={{
                                        //top:0,
                                        //display:"inline-block",
                                        //maxHeight:height-150,
                                        //width:'auto',
                                        //height:'auto',
                                        margin: 5,
                                        //textAlign: "center",
                                        //height:height
                                    }}
                                src="" alt=""/>
                            
                            {/* <Image ref={imgRef}
                                style={{
                                    display:"inline-block",
                                    maxHeight:"100%",
                                    maxWidth:"100%",
                                    width:'auto',
                                    height:'auto',
                                    margin: "auto",
                                    textAlign: "center",
                                    //height:height
                                }}
                            source={{uri:uri}} /> */}
                            <View      
                                style={{
                                    height:39,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    background:'transparent'
                                }}>
                                 <a 
                                    style={{  
                                        justifyContent:"center",
                                        alignItems:"center",         
                                        textDecorationLine:'none',
                                        textDecorationStyle:'none',
                                        height:'100%',
                                        width:'100%',
                                        backgroundColor:'transparent'
                                    }} 
                                    href="https://www.instagram.com/squwbs/?hl=ko" 
                                >
                                <i 
                                    style={{           
                                        height:33,
                                        color:'grey',
                                        display:'block',
                                        margin:3,
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
                                </a>
                            </View>
                        </View>
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
export default Instagram