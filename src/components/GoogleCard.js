import React, {Component,useCallback,useState,useEffect} from 'react'
import {Text,View,Dimensions,TouchableOpacity,Image,StyleSheet,ScrollView} from 'react-native'
import Dropzone, {useDropzone} from 'react-dropzone'
//import {Context} from '../context'
import Fade from 'react-reveal/Fade'
import XLSX from 'xlsx'
import stringifyObject from 'stringify-object'
import './css/iconHover.css'
//import YouTube from 'react-youtube';

const _ = require('lodash')

const withQuery = require('with-query').default;

const GoogleCard = (props)=> {
    const [height,setHeight]=useState(0)
    const [width,setWidth]=useState(0)
    const updateDimensions=()=>{
        setHeight(Math.floor(Dimensions.get('window').height))
        setWidth(Math.floor(Dimensions.get('window').width))
    }
    useEffect(()=>{
        Dimensions.addEventListener('change',(e)=>{
          updateDimensions()
        })
        updateDimensions()
      },[])
    const duration =270
    const getPosts=async()=>{
        const responded= await fetch('https://squwbs.herokuapp.com/getPosts',{mode:'cors'})
        const posts = await responded.json()
        
        if(Object.keys(posts).length>1){
       
       

        }
        
    }
   
    const createHashList = (props) =>{
        let parent = []
        props.hashs.map((hash)=>{
            parent.push(
            <TouchableOpacity
                
            >
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
            </TouchableOpacity>
            )
        })
        return parent;
    }
  
      return (
        <Fade
        duration={duration}
        timeout={duration}
        >
        <Fade
          style={{
            //backgroundColor:'orange',
            
            width:width-30,
          }}
          //when={fade}
          duration={duration}
          timeout={duration}
        >
         <View style={{ 
                height:height-82,
                width:width-32,
                //backgroundColor:'rgb(175,175,175)',
                backgroundColor:'transparent',
                flexDirection:'column',
                //justifyContent:'center',
                //alignItems:'center',
                // borderRadius:2,
                // borderColor:'lightgrey',
                // borderStyle:'solid',
                overflow:'hidden',
                boxSizing:"border-box",
                // shadowColor:'#000',
                // shadowOpacity:0.85,
                // shadowRadius:2,
                // shadowOffset:{
                // width:0,
                // height:0
                // },
                // elevation:2,
                // paddingTop:5,
                // paddingLeft:5,
                // paddingRight:5,
                // paddingBottom:5
            }} 
                // {...getRootProps({refKey:'innerRef'})}
            >
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center',
                    backgroundColor:'transparent'
                }}
            >
                
            
            <View
                style={{
                    width:120,
                    height:120,
                    backgroundColor:'transparent',
                    //margin:'auto',
                    //borderRadius:4,
                    //borderColor:'rgb(255,255,255)',
                    //borderWidth:1,
                    // shadowColor:'#000',
                    // shadowOpacity:0.85,
                    // shadowRadius:2,
                    // shadowOffset:{
                    //     width:0,
                    //     height:0
                    // },
                    // elevation:2,
                    //padding:10,
                    justifyContent:'center',
                    alignItems:'center',
                    marginLeft:0,
                    marginRight:0,
                    marginTop:0,
                }}
            >
                <View
                    style={{
                        height:90,
                        backgroundColor:'transparent'
                    }}
                >
                    <Image
                        style={{
                            width: 90, 
                            height: 90,
                            borderRadius:4,
                            top:0,
                            margin:0}}
                        source={{
                            uri: props.picture
                        }}
                    />
                </View>
            </View>
                <ScrollView
                    style={{
                        height:90,
                        width:width-180,
                        backgroundColor:'transparent',
                        //backgroundColor:'rgb(175,175,175)',
                        margin:0,
                        //borderRadius:4,
                        // shadowColor:'#000',
                        // shadowOpacity:0.85,
                        // shadowRadius:2,
                        // shadowOffset:{
                        //     width:0,
                        //     height:0
                        // },
                        // elevation:2,
                    }}
                    // style={{backgroundColor:'transparent',height:height-50,zIndex:98}}
                    onScroll={(e)=>{
                        //onScroll(e)
                        //console.log(e)
                        }
                    }
                    scrollEnabled={true}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={true}
                    //snapToInterval={height-50}
                    snapeToAlignment='end'
                    decelerationRate="fast"
                >
                               
                <View
                    style ={[{
                        backgroundColor:'transparent',
                        width:width-180,
                        // marginTop: 11,
                        // marginLeft:15,
                        // marginBottom:15,
                        alignItems:'center'
                    }]}
                >
                    <View
                        style ={
                        [
                            {
                                backgroundColor:'transparent',
                                width:width-210,
                                marginTop: 15,
                                // marginLeft:15,
                                // marginBottom:0
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
                </View>
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
                </ScrollView>
            </View>            
            <ScrollView
                style={{
                    height:height-130,
                    width:width-32,
                    backgroundColor:'white',
                    //backgroundColor:'rgb(175,175,175)',
                    padding:15
                }}
                // style={{backgroundColor:'transparent',height:height-50,zIndex:98}}
                onScroll={(e)=>{
                    //onScroll(e)
                    //console.log(e)
                    }
                }
                scrollEnabled={true}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={true}
                //snapToInterval={height-50}
                snapeToAlignment='end'
                decelerationRate="fast"
            > 
                     <View
            style={{
                //position:'absolute',
                width:width-60,
                height:(width-30)*315/560,
                justifyContent:'center',
                //alignItems:'center',
                
                backgroundColor:'transparent',
                padding:0,
                //top:0
            }}
        >
    
        <View
        style={{
            width:width-60,
            height:(width-30)*315/560,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'transparent'
        }}
        >
        
            <iframe 
                
                style={{
                    //background:'rgb(175,175,175)'
                }}
            
                width={width-60} 
                height={(width-30)*315/560}
                src= { "https://www.youtube.com/embed/" + props.youtubeID} 
                frameborder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>

            </iframe>
        </View>
        </View>  
        <View
            style={{
                //paddingTop:30,
                //background:'rgb(175,175,175)',
                background:'transparent',
                paddingBottom:15,
                width:width-60
            }}
        >
                    <Text
                        selectable={true} 
                        style ={[styles.text]}
                    >
                        {props.post}
                    </Text>
        </View>           
                    <br></br>
                    {/* <Text
                        selectable={true} 
                        style ={[styles.text]}
                    >
                        {props.hashs}
                    </Text> */}
                    <View
                        style={{
                            margin:0,
                            padding:0,
                            flexDirection:'column',
                            justifyContent:'center',
                            alignItems:'center'
                        }}
                    >
                        <View
                            style={{
                                margin:0,
                                padding:0,
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'center'
                                
                            }}
                        >
                            {createHashList(props)}
                        </View>
                    </View>

                
            </ScrollView> 
            <View
                style={{
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'transparent',
                    width:width-30
                }}
            >
                <View
                    style={{
                        //position:'absolute',
                        flexDirection:'row',
                        width:width-60,
                        height:45,
                        backgroundColor:'transparent',
                        alignItems:'center',
                        justifyContent:'center',
                        bottom:0,
                        overflow:'hidden'
                    }}
                >
                    <View
                        style={{
                            flexDirection:'row',
                            width:(width-35)/4,
                            backgroundColor:'transparent',
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                    >
                        <TouchableOpacity>
                        <Text
                            className='icon'
                            style ={styles.icon}
                        >
                            {/* {props.stars} <i class="fas fa-star"></i>  */}
                            {/* Flip */}
                            <i class="fas fa-edit"></i>
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection:'row',
                            width:(width-35)/4,
                            backgroundColor:'transparent',
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                    >
                        <TouchableOpacity>
                        <Text
                            className='icon'
                            style ={styles.icon}
                        >   
                        
                            <i class="fab fa-slack-hash"></i>
                        
                            {/* {props.likes} Likes  */}
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection:'row',
                            width:(width-35)/4,
                            backgroundColor:'transparent',
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                    >
                        <TouchableOpacity>
                        <Text
                            className='icon'
                            style ={[
                                styles.icon,
                                
                            ]
                                
                            }
                        >
                            <i class="fas fa-heart"></i>
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection:'row',
                            width:(width-35)/4,
                            backgroundColor:'transparent',
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                    >
                        <TouchableOpacity>
                        <Text
                            style ={styles.icon}
                            className='icon'
                        >
                            <i class="fas fa-share-alt"></i>
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
        
                </View>
            </View>
        </Fade>
    </Fade>
      )
}


const styles = StyleSheet.create({

    text:{
        fontSize: 14,
        fontWeight:'700',
        textDecorationLine:'none',
        color:'white',
        
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