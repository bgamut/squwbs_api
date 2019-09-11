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
    const [height,setHeight]=useState(0)
    const imgRef = useRef(null)
    const updateDimensions=()=>{
        setHeight(Math.floor(Dimensions.get('window').height)-300)
    }
        
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
            console.log(json)
            var instagramuri=json.instagramuri
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
            
        })
        .catch((err)=>{
            console.log(err)
        })
        window.addEventListener("resize", updateDimensions);
        window.addEventListener('orientationchange', updateDimensions)
        setHeight(Math.floor(Dimensions.get('window').height)-300)
        
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
                    <img ref={imgRef}
                        style={{
                            display:"block",
                            //maxHeight:300,
                            // maxWidth:"61%",
                            width:'auto',
                            //height:'auto'
                            height:height
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
        
                    </View>
                    </a>
                    
                </View>
              </View>
            
           
        </Fade>
      )
}
export default Instagram
