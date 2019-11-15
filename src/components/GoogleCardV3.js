import React, {Component,useCallback,useState,useEffect} from 'react'
import {Text,View,Dimensions,TouchableOpacity,Image,StyleSheet,ScrollView} from 'react-native'
import Dropzone, {useDropzone} from 'react-dropzone'
//import {Context} from '../context'
import Fade from 'react-reveal/Fade'
import XLSX from 'xlsx'
import stringifyObject from 'stringify-object'
import './css/iconHover.css'
//import YouTube from 'react-youtube';
//const isMobile = require('react-device-detect').isMobile
const isMobile=false
const _ = require('lodash')

const withQuery = require('with-query').default;

const GoogleCard = (props)=> {
    const [height,setHeight]=useState(0)
    const [width,setWidth]=useState(0)
    const [iframeHeight,setIframeHeight]=useState(0)
    const [iframeWidth,setIframeWidth]=useState(0)
    const updateDimensions=()=>{
        

        if(isMobile){
            setHeight(Math.floor(Dimensions.get('window').height))
            setWidth(Math.floor(Dimensions.get('window').width))
            if(Math.floor((Dimensions.get('window').height)-230)*560/315>(Dimensions.get('window').width-60)){
                //base on width
                setIframeWidth(Math.floor(Dimensions.get('window').width-60))
                setIframeHeight(Math.floor((Dimensions.get('window').width-60)*315/560))

            }
            else if(Math.floor((Dimensions.get('window').width)-60)*315/560>(Dimensions.get('window').height-230)){
                //base on height
                // setIframeWidth(Math.floor(Dimensions.get('window').height-230)*560/315)
                // setIframeHeight(Math.floor(Dimensions.get('window').height-230))
                setIframeWidth(Math.floor(Dimensions.get('window').width))
                setIframeHeight(Math.floor(Dimensions.get('window').height-100))
            }
        }
        else{
            setHeight(Math.floor(Dimensions.get('window').height))
            setWidth(Math.floor(Dimensions.get('window').width))
            if(Math.floor((Dimensions.get('window').height)-230)*560/315>(Dimensions.get('window').width-60)){
                //base on width
                setIframeWidth(Math.floor(Dimensions.get('window').width-60))
                setIframeHeight(Math.floor((Dimensions.get('window').width-60)*315/560))

            }
            else if(Math.floor((Dimensions.get('window').width)-60)*315/560>(Dimensions.get('window').height-230)){
                //base on height
                // setIframeWidth(Math.floor(Dimensions.get('window').height-230)*560/315)
                // setIframeHeight(Math.floor(Dimensions.get('window').height-230))
                setIframeWidth(Math.floor(Dimensions.get('window').width))
                setIframeHeight(Math.floor(Dimensions.get('window').height-100))
            }
        }
    }
    useEffect(()=>{
        Dimensions.addEventListener('change',(e)=>{
          updateDimensions()
        })
        updateDimensions()
      },[])
    const duration =270
    // const getPosts=async()=>{
    //     const responded= await fetch('https://squwbs-252702.appspot.com/getPosts',{mode:'cors'})
    //     const posts = await responded.json()
        
    //     if(Object.keys(posts).length>1){
       
       

    //     }
        
    // }
   
    const createHashList = (props) =>{
        let parent = []
        props.hashs.map((hash)=>{
            parent.push(
            
            // <TouchableOpacity>
                <Text
                    className='icon'
                    selectable={true} 
                    style ={{
                        fontSize: 12,
                        fontWeight:'700',
                        textDecorationLine:'none',
                        color:'rgb(196,196,196)',
                        textAlign:'center',
                        alignItems:'center',
                        justifyContent:'center',
                        flexDirection:'row',
                        margin:5,
                    }}
                >
                    #{hash}
                </Text>
            // </TouchableOpacity>
            )
        })
        return parent;
    }
    if(props.type=='video'){
        return (
        
        <TouchableOpacity
            onPress={
                props.touchedPost
            }
            activeOpacity={1}
        >
         <View style={{ 
                width:width-18,
                backgroundColor:'transparent',
                zIndex:98,
                flexDirection:'column',
                borderRadius:4,
                borderColor:'transparent',
                borderStyle:'solid',
                overflow:'hidden',
                boxSizing:"border-box",
            }} 
            >
            {/* <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center',
                    backgroundColor:'transparent'
                }}
            >
            
                <ScrollView
                    style={{
                        height:90,
                        width:"100%",
                        backgroundColor:'black',
                        margin:0,
                        
                        
                    }}
                    onScroll={(e)=>{
                        }
                    }
                    scrollEnabled={true}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    snapeToAlignment='end'
                    decelerationRate="fast"
                >
                               
                <View
                    style ={[{
                        backgroundColor:'transparent',
                        width:width-18,
                        alignItems:'center',
                        justifyContent:'center'
                    }]}
                >
                    <View
                        style ={
                        [
                            {
                                backgroundColor:'transparent',
                                width:iframeWidth,
                                marginTop:15,
                                marginBottom:35,
                            }
                        ]
                         }
                    >
                        <Text
                            selectable={false} 
                            style ={[styles.text]}
                        >
                            {props.title}
                        </Text>
                    
                        <Text
                            selectable={false} 
                            style ={styles.text}
                        >
                            {props.writer}
                        </Text>
                        <br></br>
                        <Text
                            selectable={true} 
                            style ={{
                                fontSize: 12,
                                fontWeight:'700',
                                textDecorationLine:'none',
                                color:'rgb(196,196,196)',
                                textAlign:'center',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                margin:5,
                            }}
                        >
                            {props.date}
                        </Text>
                    </View>
                </View>
                </ScrollView>
            </View>  */}
            <View
                style={{
                    //height:height-165,
                    //height:height-75,
                    height:iframeHeight+105,
                    backgroundColor:'transparent',
                }}
            >  
            {/* <ScrollView
                style={{
                    width:width-18,
                    backgroundColor:'red',
                    height:iframeHeight+105
                }}
                onScroll={(e)=>{

                    }
                }
                scrollEnabled={true}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={true}
                snapeToAlignment='end'
                decelerationRate="fast"

            >  */}
            <View
                style={{
                    width:{iframeWidth},
                    height:iframeHeight+15,
                    alignItems:'center',
                    backgroundColor:'black',
                    padding:0,
                }}
            >
    
                <View
                style={{
                    width:{iframeWidth},
                    height:iframeHeight+15,
                    alignItems:'center',
                    justifyContent:'center',
                    backgroundColor:'black',
                    paddingTop:15
                }}
                >
        
                    <iframe    
                        style={{
                           
                        }}
                        width={iframeWidth-60}
                        height={iframeHeight-60}
                        src= { "https://www.youtube.com/embed/" + props.video} 
                        frameborder="0" 
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen="allowfullscreen"
                        mozallowfullscreen="mozallowfullscreen" 
                        msallowfullscreen="msallowfullscreen" 
                        oallowfullscreen="oallowfullscreen" 
                        webkitallowfullscreen="webkitallowfullscreen"
                        >

                    </iframe>
                </View>
            </View> 
            <View
                style={{
                    background:'transparent',
                    alignItems:'center',
                    margin:0,
                    backgroundColor:'transparent'
                }}
            >
                <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center',
                    backgroundColor:'transparent'
                }}
            >
            
                {/* <ScrollView
                    style={{
                        height:90,
                        width:"100%",
                        backgroundColor:'black',
                        margin:0,
                        
                        
                    }}
                    onScroll={(e)=>{
                        }
                    }
                    scrollEnabled={true}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    snapeToAlignment='end'
                    decelerationRate="fast"
                >
                               
                <View
                    style ={[{
                        backgroundColor:'transparent',
                        width:width-18,
                        alignItems:'center',
                        justifyContent:'center'
                    }]}
                >
                    <View
                        style ={
                        [
                            {
                                backgroundColor:'transparent',
                                width:iframeWidth,
                                marginTop:15,
                                marginBottom:35,
                            }
                        ]
                         }
                    >
                       
                        <Text
                            selectable={true} 
                            style ={{
                                fontSize: 12,
                                fontWeight:'700',
                                textDecorationLine:'none',
                                color:'rgb(196,196,196)',
                                textAlign:'center',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                margin:5,
                            }}
                        >
                            {props.time}
                        </Text>
                    </View>
                </View>
                </ScrollView> */}
            </View> 
                {/* <View
                    style={{
                        backgroundColor:'transparent',
                        width:iframeWidth,
                        margin:0
                    }}
                >
                    <Text
                        selectable={true} 
                        style ={[styles.text]}
                    >
                        {props.post}
                    </Text>

                </View>   */}
            </View>          
            <br></br>
            <ScrollView
                style={{
                    margin:0,
                    padding:0,
                    flexDirection:'column',
                    backgroundColor:'transparent',
                    width:iframeWidth,
                    padding:15,
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={true}
            >
                <View
                    style={{
                        margin:0,
                        padding:0,
                        backgroundColor:'transparent',
                        flexDirection:'row',
                        alignItems:'center',
                        width:"100%",
                    }}
                >
                <View
                    style={{
                        margin:0,
                        padding:0,
                        backgroundColor:'transparent',
                        flexDirection:'row',
                        justifyContent:'center',
                        
                    }}
                >
                    <View
                        style={{
                            margin:0,
                            padding:0,
                            backgroundColor:'transparent',
                            flexDirection:'row',
                            justifyContent:'center',
                            alignSelf:'flex-end'
                        }}
                    >
                    </View>
                </View>
                </View>
            </ScrollView>      
        {/* </ScrollView>  */}
        </View>           
            </View>
        </TouchableOpacity>
        )
    }     
    else{
        return(
            null
        )
    }
    
    
}


const styles = StyleSheet.create({

    text:{
        fontSize: 14,
        fontWeight:'700',
        textDecorationLine:'none',
        color:'black',
        
        textShadowColor: 'rgba(0, 0, 0, 0.85)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 2,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        margin:5,
    },
    icon:{
        textDecorationLine:'none',
        color:'rgb(196,196,196)',
        fontSize: 14,
        fontWeight:'700',
        
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    }
  });

export default GoogleCard
