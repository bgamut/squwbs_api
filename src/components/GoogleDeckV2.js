import React,{Component,useContext,useState,useEffect} from 'react';
import {Animated,PanResponder,Dimensions,View,Text,Image,TouchableHighlight,TouchableOpacity,StyleSheet,FlatList,ScrollView} from 'react-native'
import { Context } from "../context";
import ReactDOM from 'react-dom'
//import GoogleCard from './GoogleCard'
import GoogleCard from './GoogleCardV3'
//import WordCardV2 from './WordCardV2'
import stringifyObject from 'stringify-object'
//const MongoClient = require('mongodb').MongoClient;
//import {swing} from "react-animations"
//import styled, { keyframes } from 'styled-components'
//import Radium, {StyleRoot} from 'radium'
import Fade from 'react-reveal/Fade'
//the following svg is downloaded from fontawesome
//https://fontawesome.com/license
import pointer from './icons/pointer.svg'


//import './css/Zoom.css'

import './css/Pointer.css'

const OAuth = require('oauth').OAuth
const tumblr = require('tumblr')

const isMobile = require('react-device-detect').isMobile
//const isMobile=false
const uuidv4 = require('uuid/v4');

const GoogleDeck =(props)=>{


    const [height,setHeight]=useState(0)
    const [width,setWidth]=useState(0)
    const [currentEntry,setCurrentEntry]=useState(0)
    const [posts,setPosts]=useState([])
    const [currentIndex,setCurrentIndex]=useState(0)
    const [endIndex,setEndIndex]=useState(1)
    const [next,setNext]=useState(true)
    const [indicatorState,setIndicatorState]=useState(true)
    const myRef=React.createRef();
  
    

  
  const shuffle=(a)=>{
    
  }
  const touchedPost=()=>{
    // setTimeout(()=>{
    //   myRef.scrollTo({x:(width-30)*currentEntry,y:0})
    // },720)
    
    //props.XAlign()
  }
  const createPostsList = (posts) =>{
    let parent = []
    if(posts!==undefined){
        posts.map((post,i,arr)=>{
            parent.push(
            <View
                key={post.id}
                id='lastPost'
                style={{
                    height:height-80,
                    width:width-30,
                    alignItems:'center'
                }}
            >
                
                <GoogleCard
                    type={post.type}
                    url={post.url}
                    id={post.id}
                    time={post.time}
                    video={post.video}
                    photo={post.photo}
                    quote={post.quote}
                    chat={post.chat}
                    audio={post.audio}
                    link={post.link}
                    text={post.text}
                />
            </View>
        )
        })
    }
    return parent;
}
  const addCard=()=>{
   

  }
  const abortController= new AbortController()

  
  const commentButtonPressed=()=>{
    props.commentButtonPressed()
    //myRef.scrollTo({x:(width-30)*currentEntry,y:0})
    // setTimeout(()=>{
    //   myRef.scrollTo({x:(width-30)*currentEntry,y:0})
    // },720)
  }

  const slackHashButtonPressed=()=>{
    props.slackHashButtonPressed()
    //myRef.scrollTo({x:(width-30)*currentEntry,y:0})
    // setTimeout(()=>{
    //   myRef.scrollTo({x:(width-30)*currentEntry,y:0})
    // },720)
  }
  const starButtonPressed=()=>{
    props.starButtonPressed()
    //myRef.scrollTo({x:(width-30)*currentEntry,y:0})
    // setTimeout(()=>{
    //   myRef.scrollTo({x:(width-30)*currentEntry,y:0})
    // },720)
  }
  const shareButtonPressed=()=>{
    props.shareButtonPressed()
    //myRef.scrollTo({x:(width-30)*currentEntry,y:0})
    // setTimeout(()=>{
    //   myRef.scrollTo({x:(width-30)*currentEntry,y:0})
    // },720)
  }
  const requestPosts=()=>{
    

  }
  useEffect(()=>{

    const updateDimensions=()=>{
        setHeight(Math.floor(Dimensions.get('window').height))
        setWidth(Math.floor(Dimensions.get('window').width))   
    }
    
    Dimensions.addEventListener('change',(e)=>{
        updateDimensions()
    })
    updateDimensions()
    // const getTumblrPosts=()=>{
    //     var temp=[]
    //     const appConsumerKey = 'ZcMcl1wmyAyF3xr1TnkjIlgU8G7xJK1wmoGfG1sULTL1wpWE9t'
    //     const appConsumerSecret='3LIzxmGOfmrjIgT1cHDyECMNrHtxZ3TomNOTCY7sKoOQC3cxjq'
    //     const authorizeUrl = 'https://www.tumblr.com/oauth/authorize';
    //     const requestTokenUrl = 'https://www.tumblr.com/oauth/request_token';
    //     const accessTokenUrl = 'https://www.tumblr.com/oauth/access_token';
    //     const oa = new OAuth(
    //         requestTokenUrl,
    //         accessTokenUrl,
    //         appConsumerKey,
    //         appConsumerSecret,
    //         '1.0A',
    //         'https://squwbs.com',
    //         'HMAC-SHA1'
    //     );

    //     oa.getOAuthRequestToken(function (err, token, secret) {
    //         if (err) {
    //         console.error('\tFailed with error', err);
    //         }
    //         console.log('\ttoken %s | secret %s', token, secret);
    //         var oauth={
    //             consumer_key:appConsumerKey,
    //             consumer_secret:appConsumerSecret,
    //             token:token,
    //             token_secret:secret,
    //         }
    //         var blog = new tumblr.Blog('gamutperiod.tumblr.com',oauth)
    //         blog.posts({limit:50,offset:0},function(err,response){
    //             if(err){
    //                 console.log(err)
    //             }
    //             for (var i =0; i<response.posts.length; i++){
    //                 if(response.posts[i].type=='video'){
    //                     if(response.posts[i].video!==undefined){
    //                         if(response.posts[i].video.youtube!==undefined){
    //                             temp.push(
    //                             {
    //                                 type:'video',
    //                                 url:response.posts[i].short_url,
    //                                 id:response.posts[i].id,
    //                                 time:response.posts[i].timestamp,
    //                                 video:response.posts[i].video.youtube.video_id
    //                             }
    //                             )
    //                         }
    //                     }
                        
    //                 }
                    
    //                 if(response.posts[i].type=='photo'){
    //                     var photoList=[]
    //                     if(response.posts[i].image_permalink==undefined){
                            
    //                         for(var j = 0; j<response.posts[i].photos.length; j++){
    //                             photoList.push(response.posts[i].photos[j].original_size.url)
    //                         }
    //                     }
    //                     else{
    //                         photoList.push(response.posts[i].image_permalink)
    //                     }
    //                     temp.push(
    //                     {
    //                         type:'photo',
    //                         url:response.posts[i].short_url,
    //                         id:response.posts[i].id,
    //                         time:response.posts[i].timestamp,
    //                         photo:photoList
    //                     }
    //                     )
    //                 }
    //                 if(response.posts[i].type=='quote'){
    //                     temp.push(
    //                     {
    //                         type:'quote',
    //                         url:response.posts[i].short_url,
    //                         id:response.posts[i].id,
    //                         time:response.posts[i].timestamp,
    //                         quote:response.posts[i].text
    //                     }
    //                     )
    //                 }
    //                 if(response.posts[i].type=='audio'){
    //                     temp.push(
    //                     {
    //                         type:'audio',
    //                         url:response.posts[i].short_url,
    //                         id:response.posts[i].id,
    //                         time:response.posts[i].timestamp,
    //                         audio:response.posts[i].audio_url
    //                     }
    //                     )
    //                 }

    //                 if(response.posts[i].type=='text'){
    //                     temp.push(
    //                     {
    //                         type:'text',
    //                         url:response.posts[i].short_url,
    //                         id:response.posts[i].id,
    //                         time:response.posts[i].timestamp,
    //                         text:response.posts[i].body
    //                     }
    //                     )
    //                 }
    //                 if(response.posts[i].type=='link'){
    //                     if(response.posts[i].link_image!==undefined){
    //                         temp.push(
    //                         {
    //                             type:'link',
    //                             url:response.posts[i].short_url,
    //                             id:response.posts[i].id,
    //                             time:response.posts[i].timestamp,
    //                             link:response.posts[i].url,
    //                             image:response.posts[i].link_image
    //                         }
    //                         )
    //                     }
    //                     else{
    //                     temp.push(
    //                         {
    //                         type:'link',
    //                         url:response.posts[i].short_url,
    //                         id:response.posts[i].id,
    //                         time:response.posts[i].timestamp,
    //                         link:response.posts[i].url,
    //                         image:undefined
    //                         }
    //                     )
    //                     }
    //                 }
    //                 if(response.posts[i].type=='chat'){
    //                     var chatList=[]
    //                     for (var j = 0; j<response.posts[i].dialogue.length;j++){
    //                         console.log(response.posts[i].dialogue[j].name+':'+response.posts[i].dialogue[j].phrase)
    //                         chatList.push(String(response.posts[i].dialogue[j].name)+' : '+String(response.posts[i].dialogue[j].phrase))
    //                     }
    //                     temp.push(
    //                     {
    //                         type:'chat',
    //                         url:response.posts[i].short_url,
    //                         id:response.posts[i].id,
    //                         time:response.posts[i].timestamp,
    //                         url:response.posts[i].url,
    //                         chat:chatList
    //                     }
    //                     )
    //                 }
                    
    //             }
    //             console.log('this is the posts returned : '+ temp)
    //             return temp
    //         })
    //     })
        
    // }
    // const getTumblrPosts=()=>{
    //     var temp=[]
        
    //     fetch('https://squwbs-252702.appspot.com/tumblrAuth', { 
    //         mode:'cors'
    //     })
    //     .then(result=>{
    //       return result.json()
    //     })
    //     .then((json)=>{
    //       console.log('tumblrAuth returns : ',json)
    //       var oauth=json
    //       var blog = new tumblr.Blog('gamutperiod.tumblr.com',oauth)
    //       blog.posts({limit:50,offset:0},function(err,response){
    //           if(err){
    //               console.log(err)
    //           }
    //           for (var i =0; i<response.posts.length; i++){
    //               if(response.posts[i].type=='video'){
    //                   if(response.posts[i].video!==undefined){
    //                       if(response.posts[i].video.youtube!==undefined){
    //                           temp.push(
    //                           {
    //                               type:'video',
    //                               url:response.posts[i].short_url,
    //                               id:response.posts[i].id,
    //                               time:response.posts[i].timestamp,
    //                               video:response.posts[i].video.youtube.video_id
    //                           }
    //                           )
    //                       }
    //                   }
                      
    //               }
                  
    //               if(response.posts[i].type=='photo'){
    //                   var photoList=[]
    //                   if(response.posts[i].image_permalink==undefined){
                          
    //                       for(var j = 0; j<response.posts[i].photos.length; j++){
    //                           photoList.push(response.posts[i].photos[j].original_size.url)
    //                       }
    //                   }
    //                   else{
    //                       photoList.push(response.posts[i].image_permalink)
    //                   }
    //                   temp.push(
    //                   {
    //                       type:'photo',
    //                       url:response.posts[i].short_url,
    //                       id:response.posts[i].id,
    //                       time:response.posts[i].timestamp,
    //                       photo:photoList
    //                   }
    //                   )
    //               }
    //               if(response.posts[i].type=='quote'){
    //                   temp.push(
    //                   {
    //                       type:'quote',
    //                       url:response.posts[i].short_url,
    //                       id:response.posts[i].id,
    //                       time:response.posts[i].timestamp,
    //                       quote:response.posts[i].text
    //                   }
    //                   )
    //               }
    //               if(response.posts[i].type=='audio'){
    //                   temp.push(
    //                   {
    //                       type:'audio',
    //                       url:response.posts[i].short_url,
    //                       id:response.posts[i].id,
    //                       time:response.posts[i].timestamp,
    //                       audio:response.posts[i].audio_url
    //                   }
    //                   )
    //               }
  
    //               if(response.posts[i].type=='text'){
    //                   temp.push(
    //                   {
    //                       type:'text',
    //                       url:response.posts[i].short_url,
    //                       id:response.posts[i].id,
    //                       time:response.posts[i].timestamp,
    //                       text:response.posts[i].body
    //                   }
    //                   )
    //               }
    //               if(response.posts[i].type=='link'){
    //                   if(response.posts[i].link_image!==undefined){
    //                       temp.push(
    //                       {
    //                           type:'link',
    //                           url:response.posts[i].short_url,
    //                           id:response.posts[i].id,
    //                           time:response.posts[i].timestamp,
    //                           link:response.posts[i].url,
    //                           image:response.posts[i].link_image
    //                       }
    //                       )
    //                   }
    //                   else{
    //                   temp.push(
    //                       {
    //                       type:'link',
    //                       url:response.posts[i].short_url,
    //                       id:response.posts[i].id,
    //                       time:response.posts[i].timestamp,
    //                       link:response.posts[i].url,
    //                       image:undefined
    //                       }
    //                   )
    //                   }
    //               }
    //               if(response.posts[i].type=='chat'){
    //                   var chatList=[]
    //                   for (var j = 0; j<response.posts[i].dialogue.length;j++){
    //                       console.log(response.posts[i].dialogue[j].name+':'+response.posts[i].dialogue[j].phrase)
    //                       chatList.push(String(response.posts[i].dialogue[j].name)+' : '+String(response.posts[i].dialogue[j].phrase))
    //                   }
    //                   temp.push(
    //                   {
    //                       type:'chat',
    //                       url:response.posts[i].short_url,
    //                       id:response.posts[i].id,
    //                       time:response.posts[i].timestamp,
    //                       url:response.posts[i].url,
    //                       chat:chatList
    //                   }
    //                   )
    //               }
                  
    //           }
    //           //window.posts=posts
    //           console.log('this is the posts returned : ',stringifyObject(posts,{
    //             indent: ' ',
    //             singleQuotes:false
    //           }))
    //           return temp
    //       })
    //     })
    //     .catch((err)=>{
    //       console.log(err)
    //     })
    // }
    const getTumblrPosts=()=>{
        var temp=[]
        
        fetch('https://squwbs-252702.appspot.com/tumblr', { 
            mode:'cors'
        })
        .then(result=>{
          return result.json()
        })
        .then((json)=>{
          console.log('/tumblr returns : ',json)
          
        })
        .catch((err)=>{
          console.log(err)
        })
    }
    var posts = getTumblrPosts()
    // console.log('posts : ',stringifyObject(posts,{
    //     indent: ' ',
    //     singleQuotes:false
    // }))
    setPosts(posts)
  },[])
  useEffect(()=>{

    console.log('posts changed ! ',stringifyObject(posts,{
        indent: ' ',
        singleQuotes:false
    }))
  },[posts])

  const onMouseEnter=()=>{
    console.log('googledeck.js fired on mouse enter')
    setIndicatorState(true)
  }

  const onMouseLeave=()=>{
    console.log('googledeck.js fired on mouse leave')
    setIndicatorState(false)
  }
  const onScroll = (e)=>{
    var maxNum=e.nativeEvent.contentSize.width-(width-30)
    if(e.nativeEvent.contentOffset.x%(width-30)<(width-30)/2){
        setCurrentEntry(Math.floor(e.nativeEvent.contentOffset.x/(width-30)))
    }
    else if (e.nativeEvent.contentOffset.x%(width-30)>=(width-30)/2){
        setCurrentEntry(Math.ceil(e.nativeEvent.contentOffset.x/(width-30)))
    }
  }
    if(isMobile){

        return (
          <Fade
                    duration={270}
                    timeout={270}
                >
          <View
            style={{
              borderWidth:4,
              borderColor:'transparent',
              backgroundColor:'transparent',
              paddingTop:0,
              paddingLeft:0,
              paddingRight:0,
              margin:0,
              //width:width-30,
              width:width-18,
              zIndex:99,
              transform:[{
                translateX:-8,
              },
              {
                translateY:-10,
              }]
            }
            }
          >
         
            <TouchableOpacity
              onPress={touchedPost}
              activeOpacity={1}
            >
            <ScrollView
                ref={myRef}
                //ref={myRef}
                style={{
                    // display:'absolute',
                    // left:0,
                    
                  //   transform:[{
                  //     translateX:4,
                  //   },
                  //   {
                  //     translateY:0,
                  //   }
                  // ],
                    height:height-74,
                    //height:'100%',
                    width:width-18,
                    //width:width-30,
                    backgroundColor:'transparent',
                    //backgroundColor:'rgb(175,175,175)',
                    margin:0,
                    flexDirection:'row',
                    paddingTop:0,
                    paddingLeft:0,
                    paddingRight:0,
                    paddingBottom:0,
                    // paddingBottom:15,
                    // paddingRight:15,
                    //backgroundColor:'transparent',
                    borderColor:'transparent',
                    borderWidth:4,
                    borderStyle:'solid',
                    padding:0,
                    zIndex:98
                }}
                onScroll={onScroll}
                scrollEventThrottle={16}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                //showsHorizontalScrollIndicator={indicatorState}
                snapeToAlignment='end'
                decelerationRate="fast"
                scrollIndicatorInsets={1000,240,500,24}
            >
        {/* <FlatList 
            horizontal ={true}
            scrollEnabled={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={true}
            legacyImplementation={false}
            data={posts}
            renderItem={() => createPostsList()}
            keyExtractor={() => uuidv4()}
        /> */}
      
            {createPostsList(posts)}
        
          </ScrollView> 
                
                  <View
                    style={{
                      // transform:[{
                      //     translateX:0,
                      //   },
                      //   {
                      //     translateY:-4,
                      //   }
                      // ],
                      justifyContent:'center',
                      alignItems:'center',
                      backgroundColor:'white',
                      width:width-18,
                      height:50,
                      zIndex:99,
                      //borderWidth:4,
                      //borderRadius:4,
                      //borderColor:'transparent',

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
                              width:(width-30)/4,
                              backgroundColor:'transparent',
                              alignItems:'center',
                              justifyContent:'center'
                          }}
                      >
                          {/* <TouchableOpacity
                            //onPress={props.commentButtonPressed}
                            onPress={commentButtonPressed}
                          >
                          
                          <Text
                              className='icon'
                              style ={styles.icon}
                          >
                              
                              <i class="fas fa-server"></i>
                          </Text>
                          </TouchableOpacity> */}
                      </View>
                      
                      <View
                          style={{
                              flexDirection:'row',
                              width:(width-30)/4,
                              backgroundColor:'transparent',
                              alignItems:'center',
                              justifyContent:'center'
                          }}
                      >
                          {/* <TouchableOpacity
                            //onPress={props.shareButtonPressed}
                            onPress={shareButtonPressed}
                          >
                          <Text
                              style ={styles.icon}
                              className='icon'
                          >
                              <i class="fas fa-share-alt"></i>
                          </Text>
                          </TouchableOpacity> */}
                      </View>
                      
                      <View
                          style={{
                              flexDirection:'row',
                              width:(width-30)/4,
                              backgroundColor:'transparent',
                              alignItems:'center',
                              justifyContent:'center'
                          }}
                      >
                          {/* <TouchableOpacity
                            //onPress={props.starButtonPressed}
                            onPress={starButtonPressed}
                          >
                          <Text
                              className='icon'
                              style ={[
                                  styles.icon,
                                  
                              ]
                                  
                              }
                          >
                              
                              <i class="fas fa-star"></i> 
                          </Text>
                          </TouchableOpacity> */}
                      </View>
                      <View
                          style={{
                              flexDirection:'row',
                              width:(width-30)/4,
                              backgroundColor:'transparent',
                              alignItems:'center',
                              justifyContent:'center'
                          }}
                      >
                          <TouchableOpacity
                            //onPress={props.slackHashButtonPressed}
                            onPress={slackHashButtonPressed}
                          >
                          <Text
                              className='icon'
                              style ={styles.icon}
                          >   
                          
                              <i class="fab fa-slack-hash"></i>
                          
                              {/* {props.likes} Likes  */}
                          </Text>
                          </TouchableOpacity>
                      </View>
                  </View>
                
                  </View>
                
                </TouchableOpacity>
        </View>    
        </Fade>  
              
          
              
        );
      }
      else{
        return (
          <Fade
                    duration={270}
                    timeout={270}
                >
          <View
            style={{
              borderWidth:4,
              borderColor:'transparent',
              backgroundColor:'transparent',
              paddingTop:0,
              paddingLeft:0,
              paddingRight:0,
              margin:0,
              //width:width-30,
              width:width-18,
              zIndex:99,
              transform:[{
                translateX:-8,
              },
              {
                translateY:-10,
              }]
            }
            }
          >
         
            <TouchableOpacity
              onPress={touchedPost}
              activeOpacity={1}
            >
            <ScrollView
                ref={myRef}
                //ref={myRef}
                style={{
                    // display:'absolute',
                    // left:0,
                    
                  //   transform:[{
                  //     translateX:4,
                  //   },
                  //   {
                  //     translateY:0,
                  //   }
                  // ],
                    //height:height-70,
                    height:height-74,
                    //height:'100%',
                    width:width-18,
                    //width:width-30,
                    backgroundColor:'transparent',
                    //backgroundColor:'rgb(175,175,175)',
                    margin:0,
                    flexDirection:'row',
                    paddingTop:0,
                    paddingLeft:0,
                    paddingRight:0,
                    paddingBottom:0,
                    // paddingBottom:15,
                    // paddingRight:15,
                    //backgroundColor:'transparent',
                    borderColor:'transparent',
                    borderWidth:4,
                    borderStyle:'solid',
                    padding:0,
                    zIndex:98
                }}
                onScroll={onScroll}
                scrollEventThrottle={16}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                //showsHorizontalScrollIndicator={indicatorState}
                snapeToAlignment='end'
                decelerationRate="fast"
                scrollIndicatorInsets={1000,240,500,24}
            >
        {/* <FlatList 
            horizontal ={true}
            scrollEnabled={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={true}
            legacyImplementation={false}
            data={posts}
            renderItem={() => createPostsList()}
            keyExtractor={() => uuidv4()}
        /> */}
      
            {createPostsList(posts)}
        
          </ScrollView> 
                
                  <View
                    style={{
                      // transform:[{
                      //     translateX:0,
                      //   },
                      //   {
                      //     translateY:-4,
                      //   }
                      // ],
                      justifyContent:'center',
                      alignItems:'center',
                      backgroundColor:'white',
                      width:width-18,
                      height:50,
                      //borderWidth:4,
                      //borderRadius:4,
                      //borderColor:'transparent',
                      zIndex:99,

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
                              width:(width-30)/4,
                              backgroundColor:'transparent',
                              alignItems:'center',
                              justifyContent:'center'
                          }}
                      >
                          {/* <TouchableOpacity
                            //onPress={props.slackHashButtonPressed}
                            onPress={slackHashButtonPressed}
                          >
                          <Text
                              className='icon'
                              style ={styles.icon}
                          >   
                          
                              <i class="fab fa-slack-hash"></i>
                          
                              
                          </Text>
                          </TouchableOpacity> */}
                      </View>
                      <View
                          style={{
                              flexDirection:'row',
                              width:(width-30)/4,
                              backgroundColor:'transparent',
                              alignItems:'center',
                              justifyContent:'center'
                          }}
                      >
                          {/* <TouchableOpacity
                            //onPress={props.starButtonPressed}
                            onPress={starButtonPressed}
                          >
                          <Text
                              className='icon'
                              style ={[
                                  styles.icon,
                                  
                              ]
                                  
                              }
                          >
                              
                              <i class="fas fa-star"></i> 
                          </Text>
                          </TouchableOpacity> */}
                      </View>
                      <View
                          style={{
                              flexDirection:'row',
                              width:(width-30)/4,
                              backgroundColor:'transparent',
                              alignItems:'center',
                              justifyContent:'center'
                          }}
                      >
                          {/* <TouchableOpacity
                            //onPress={props.shareButtonPressed}
                            onPress={shareButtonPressed}
                          >
                          <Text
                              style ={styles.icon}
                              className='icon'
                          >
                              <i class="fas fa-share-alt"></i>
                          </Text>
                          </TouchableOpacity> */}
                      </View>
                      <View
                          style={{
                              flexDirection:'row',
                              width:(width-30)/4,
                              backgroundColor:'transparent',
                              alignItems:'center',
                              justifyContent:'center'
                          }}
                      >
                          <TouchableOpacity
                            //onPress={props.commentButtonPressed}
                            onPress={commentButtonPressed}
                          >
                          
                          <Text
                              className='icon'
                              style ={styles.icon}
                          >
                              {/* {props.stars} <i class="fas fa-star"></i>  */}
                              {/* Flip */}
                              {/* <i class="fas fa-edit"></i> */}
                              <i class="fas fa-server"></i>
                          </Text>
                          </TouchableOpacity>
                      </View>
                      
                  </View>
                
                  </View>
                
                </TouchableOpacity>
        </View>    
        </Fade>  
              
          
              
        );
      } 
    


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
      fontSize: 20,
      fontWeight:'700',
      
      textAlign:'center',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row',
  }
});

export default GoogleDeck;



