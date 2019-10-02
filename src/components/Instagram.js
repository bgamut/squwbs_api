import React, {Component,useCallback,useState,useRef,useEffect} from 'react'
import {Text,View,Dimensions,TouchableOpacity,Image,Animated,Easing} from 'react-native'
import Dropzone, {useDropzone} from 'react-dropzone'
//import {Context} from '../context'
import Fade from 'react-reveal/Fade'
import XLSX from 'xlsx'
import stringifyObject from 'stringify-object'
import {swing} from "react-animations"
//import styled, { keyframes } from 'styled-components'
import Radium, {StyleRoot} from 'radium'
import iglogo from './icons/iglogo.svg'

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


const Instagram = (props)=> {
    const [current,setCurrent]=useState(0)
    const [height,setHeight]=useState(0)
    const [width,setWidth]=useState(0)
    const [uri,setUri]=useState('')
    const [uriList,setUriList]=useState([])
    const [show,setShow]=useState('Show')
    const [index,setIndex]=useState(0)
    const [dummy,setDummy]=useState(0)
    const imgRef1 = useRef(null)
    const imgRef2 = useRef(null)
    var opacity = new Animated.Value(0);
    //var val
    opacity.addListener(({value}) => {
        //value;
        //console.log(value)
        imgRef1.current.style.opacity=value

    })
    const opacityAnimationToOne=()=>{
        // console.log(opacity._value)

        // console.log(opacity._value==0)
        // console.log(opacity._value==1)
        //console.log('to One')
        Animated.spring(opacity, 
            {
                toValue: 1,
                
            }
        ).start()
    }
    const opacityAnimationToZero=()=>{
        //console.log(opacity._value)
        //console.log("to Zero")
        Animated.spring(opacity, 
            {
                toValue: 0,
                
                //speed:12,
                
            }
        ).start()
    }
    
    
    const updateDimensions=()=>{
        setHeight(Dimensions.get('window').height)
        setWidth(Dimensions.get('window').width)
    }
        
    useEffect(()=>{
        //console.log('width:'+width+' height:'+height)
        if(width>=height){
            //console.log('landscape')
            //imgRef1.current.maxHeight=height-200
            //console.log(imgRef1.current.style)
            //imgRef1.current.maxWidth=width-200
            //imgRef2.current.maxHeight=height-200
            //imgRef2.current.maxWidth=width-200
        }
        else{
            //console.log('portrait')
            //imgRef1.current.maxHeight=height-200
            // imgRef1.current.width=width-300
            //imgRef2.current.maxHeight=height-200
            // imgRef2.current.width=width-300
            
        }
        //console.log(imgRef1.current.height)
        
    },[height,width])
    useEffect(()=>{
        fetch('https://squwbs-252702.appspot.com/instagramuri'
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
                imgRef1.current.src=imageurl
                var temp = []
                for (var i =0; i<20; i++){
                    temp[i]=json.data[i].images.standard_resolution.url
                }
                setUriList(temp)
                
                // imgRef1.setNativeProps({
                //     source:[{uri:imageurl}]
                // })
                // console.log(imgRef1.source)
                
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
        setIndex(1)
    },[])
    useEffect(()=>{
        //console.log(uriList)
        // var i=0
        // setInterval(function(){ 
        // //console.log("Hello"); 
        // const pad=(n, width, z)=>{
        // z = z || '0';
        // n = n + '';
        // return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        // }
        // //console.log('memory percentage :'+pad(parseFloat(Math.round(window.performance.memory.usedJSHeapSize/ window.performance.memory.jsHeapSizeLimit*10000)/100).toFixed(2),5))
        // //console.log("album picture # "+i%15)
        // //console.log(uriList[i%15])
        
        // //imgRef1.current.src=uriList[i%15]
        
        
        // //i++
        // }, 7000);
    },[uriList])
    
    useEffect(()=>{
        //console.log('index change')
        function sleep(ms){
            return new Promise(resolve=>{
                setTimeout(resolve,ms)
            })
        }
        // sleep(3000).then(
        //     function(){
        //         setIndex(index+1)
        //     }
        // )
        if(show=='Hide'){
            sleep(5).then(
                function(){
                    setShow('Show')
                    opacityAnimationToOne()
                    sleep(3000).then(
                        function(){
                        // console.log('hi')
                            setDummy(dummy+1)
                        }
                    )
                }
            )
            
            
        }
        else{
            
            setShow('Hide')
            setIndex(index+1)
            opacityAnimationToZero()
            imgRef1.current.src=uriList[index%20]
        }
        //opacityAnimation()
       
        
        
    },[index,dummy])
      
    
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
                            {/* <View
                                style={{
                                    backgroundColor:'red',
                                    height:height,
                                    width:width,
                                   

                                    //paddingTop:0,
                                }}
                            > */}
                            
                                <img ref={imgRef1}
                                    className="Unselectable"
                                    style={{
                                        //top:0,
                                        //display:"inline-block",
                                        maxHeight:height-200,
                                        maxWidth:width-100,
                                        width:'auto',
                                        height:'auto',
                                        margin: 5,
                                        //opacity:0.5
                                        //textAlign: "center",
                                        //height:height
                                        //position:'absolute',
                                        //top:0,
                                        //left:0
                                        userSelece:'none',
                                        pointerEvents:'none',
                                        
                                    }}
                                    unselectable="on"
                                src="" alt=""/>
                                <img ref={imgRef2}
                                    unselectable="on"
                                    style={{
                                        //top:0,
                                        //display:"inline-block",
                                        maxHeight:height-200,
                                        maxWidth:width-100,
                                        //width:'auto',
                                        //height:'auto',
                                        margin: 5,
                                        //textAlign: "center",
                                        //height:height
                                        //position:'absolute',
                                        //top:0,
                                        //left:0
                                        display:'hidden'
                                    }}
                                src="" alt=""/>
                            
                            {/* </View> */}
                            
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
                                    backgroundColor:'transparent'
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
                                    {/* <StyleRoot>
                                        <i 
                                            style={[{           
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
                                            },{...styles.swing}]}
                                            className="fab fa-instagram fa-4x">
                                        
                                        </i>
                                    </StyleRoot> */}
                                    <img 
                                        className="Wiggle Unselectable" 
                                            src={iglogo}
                                            style={{           
                                            height:30,
                                            width:30,
                                            color:'white',
                                            filter:'invert(0.8)',
                                        
                                        
                                        textAlign:'center',
                                        
                                        
                                        }}
                                        />
                                </a>
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
export default Instagram
