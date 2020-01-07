import React,{Component,useContext} from 'react';
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
var isWindows=require('is-windows');
//const isMobile=false
const uuidv4 = require('uuid/v4');
var portrait=true
class GoogleDeck extends Component {
  constructor(props){
    super(props)
    this.state = {
        height:0,
        width:0,
        currentEntry:0,
      posts:[
          {
            title:'random 1',
            date:'2001/2/3',
            picture:null,
            writer:'json example',
            youtubeID:null,
            post:"Sometimes I forget to say thank youMost times I forget to say how I appreciate youDon't ever want to make you feel unwanted So baby, this is what I'm gonna do I'm gonna turn off the lights, you sit tight (oh na oh nanana) While I turn the music loud, lay you down (oh na oh nanana) Girl, I'm gonna pop this bottle, love my saddle (oh na oh nanana) Sometimes I forget to say thank youMost times I forget to say how I appreciate youDon't ever want to make you feel unwanted So baby, this is what I'm gonna do I'm gonna turn off the lights, you sit tight (oh na oh nanana) While I turn the music loud, lay you down (oh na oh nanana) Girl, I'm gonna pop this bottle, love my saddle (oh na oh nanana) Sometimes I forget to say thank youMost times I forget to say how I appreciate youDon't ever want to make you feel unwanted So baby, this is what I'm gonna do I'm gonna turn off the lights, you sit tight (oh na oh nanana) While I turn the music loud, lay you down (oh na oh nanana) Girl, I'm gonna pop this bottle, love my saddle (oh na oh nanana) Sometimes I forget to say thank youMost times I forget to say how I appreciate youDon't ever want to make you feel unwanted So baby, this is what I'm gonna do I'm gonna turn off the lights, you sit tight (oh na oh nanana) While I turn the music loud, lay you down (oh na oh nanana) Girl, I'm gonna pop this bottle, love my saddle (oh na oh nanana)",
            stars:3.5,
            comments:[

            ],
            hashs:['first','post','sample'],
          },
          
          {
            title:'third',
            date:'2001/2/6',
            picture:null,
            writer:'json',
            youtubeID:'R5J1Ykj0U8o',
            post:"Sometimes I forget to say thank youMost times I forget to say how I appreciate youDon't ever want to make you feel unwanted So baby, this is what I'm gonna do I'm gonna turn off the lights, you sit tight (oh na oh nanana) While I turn the music loud, lay you down (oh na oh nanana) Girl, I'm gonna pop this bottle, love my saddle (oh na oh nanana) Sometimes I forget to say thank youMost times I forget to say how I appreciate youDon't ever want to make you feel unwanted So baby, this is what I'm gonna do I'm gonna turn off the lights, you sit tight (oh na oh nanana) While I turn the music loud, lay you down (oh na oh nanana) Girl, I'm gonna pop this bottle, love my saddle (oh na oh nanana)",
            stars:4.5,
            comments:[
                {
                    title:'random 3',
                    date:'2001/2/6',
                    picture:null,
                    writer:'commentor',
                    youtubeID:'pNfTK39k55U',
                    post:'comment one',
                    stars:2.5,
                    comments:[],
                    hashs:['third'],
                  },
            ],
            hashs:['second','mirror','more','examples'],
          }

      ],
      currentIndex:0,
      endIndex:1,
      next:true,
      indicatorState:true,
      iframeWidth:0,
      iframeWeight:0
    };
    this.myRef=React.createRef();
  
    

  }
  shuffle=(a)=>{
    
  }
  touchedPost=()=>{
    // setTimeout(()=>{
    //   this.myRef.scrollTo({x:(this.state.width-30)*this.state.currentEntry,y:0})
    // },720)
    
    //this.props.XAlign()
  }
  createPostsList = () =>{
    const touchedPost=()=>{
      setTimeout(()=>{
        this.myRef.scrollTo({x:(this.state.width-30)*this.state.currentEntry,y:0})
      },720)
      
      //this.props.XAlign()
    }
    let parent = []
    //var length=this.state.posts.length
    if(this.state.posts!==undefined){
    
      this.state.posts.map((post,i,arr)=>{
        //console.log(arr)
        //if(i==length){
          const date =new Date(post.time*1000)
          const time = String(date)
         
           
          
          if(post.type=='video'){
            if(isMobile==false){
              parent.push(
                <View
                  style={{
                    height:this.state.iframeHeight+15,
                    width:30,
                    backgroundColor:'black'
                  }}
                >
                  <Text
                    style={{
            
                      color:'transparent'
                    }}
                  >bar</Text>
                </View>
              )
            }
          parent.push(
            <View
                key={post.id}
                id='lastPost'
                style={{
                    //height:this.state.height-80,
                    //width:this.state.width-30,
                    //height:this.state.height-30,
                    //height:'100%',
                    //width:this.state.width-18,
                    width:this.state.width-45,
                    //height:this.state.iframeHeight+105,
                    height:this.state.iframeHeight+15,
                    //width:this.state.iframeWidth,
                    // backgroundColor:'transparent',
                    // borderColor:'transparent',
                    // borderWidth:'2',
                    // borderStyle:'solid',
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'transparent',
                    // marginLeft:15,
                    // mariginRight:15
                    // transform:[{
                    //   translateX:12,
                    // },
                    // {
                    //   translateY:0,
                    // }]
                }}
            >
                {/* <GoogleCard
                    title={post.title}
                    date={post.date}
                    picture={post.picture}
                    writer={post.writer}
                    youtubeID={post.youtubeID}
                    post={post.post}
                    stars={post.stars}
                    comments={post.comments}
                    hashs={post.hashs}
                    touchedPost={touchedPost}
                    // commentButtonPressed={post.commentButtonPressed}
                    // slackButtonPressed={post.slackButtonPressed}
                    // starButtonPressed={post.startButtonPressed}
                /> */}
                <GoogleCard
                    type={post.type}
                    url={post.url}
                    id={post.id}
                    time={time}
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
        }
        // }
        // else{
        //   parent.push(
        //       <View
        //           style={{
        //               height:this.state.height-80,
        //               width:this.state.width-30,
        //               backgroundColor:'white',
        //               borderColor:'purple',
        //               borderWidth:'2',
        //               borderStyle:'solid',
        //               justifyContent:'center',
        //               alignItems:'center'

        //               // marginLeft:15,
        //               // mariginRight:15
        //           }}
        //       >
        //           <GoogleCard
        //               title={post.title}
        //               date={post.date}
        //               picture={post.picture}
        //               writer={post.writer}
        //               youtubeID={post.youtubeID}
        //               post={post.post}
        //               stars={post.stars}
        //               comments={post.comments}
        //               hashs={post.hashs}
        //           />
        //       </View>
        //   )
        // }
      })
    }
    //if(portrait==false){

if(isMobile==false){
    parent.push(
      <View
        style={{
          height:this.state.iframeHeight+15,
          width:30,
          backgroundColor:'black'
        }}
      >
        <Text
          style={{
  
            color:'transparent'
          }}
        >bar</Text>
      </View>
    )
  }
  //}
    return parent;
}
  addCard=()=>{
   

  }
  abortController= new AbortController()
  UNSAFE_componentWillUnmount(){
    this.abortController.abort()
  }
  componentDidUpdate(prevProps,prevState){
    console.log("GoogleDeck.js This is the currentEntry : ",this.state.currentEntry)
  }
  
  commentButtonPressed=()=>{
    this.props.commentButtonPressed()
    //this.myRef.scrollTo({x:(this.state.width-30)*this.state.currentEntry,y:0})
    setTimeout(()=>{
      this.myRef.scrollTo({x:(this.state.width-30)*this.state.currentEntry,y:0})
    },720)
  }

  slackHashButtonPressed=()=>{
    this.props.slackHashButtonPressed()
    //this.myRef.scrollTo({x:(this.state.width-30)*this.state.currentEntry,y:0})
    setTimeout(()=>{
      this.myRef.scrollTo({x:(this.state.width-30)*this.state.currentEntry,y:0})
    },720)
  }
  starButtonPressed=()=>{
    this.props.starButtonPressed()
    //this.myRef.scrollTo({x:(this.state.width-30)*this.state.currentEntry,y:0})
    setTimeout(()=>{
      this.myRef.scrollTo({x:(this.state.width-30)*this.state.currentEntry,y:0})
    },720)
  }
  shareButtonPressed=()=>{
    this.props.shareButtonPressed()
    //this.myRef.scrollTo({x:(this.state.width-30)*this.state.currentEntry,y:0})
    setTimeout(()=>{
      this.myRef.scrollTo({x:(this.state.width-30)*this.state.currentEntry,y:0})
    },720)
  }
  requestPosts=()=>{
    // fetch('https://squwbs-252702.appspot.com/getPosts',[{mode:'cors'},{signal:this.abortController.signal}])
    // .then((res)=>{
    //   console.log(stringifyObject(res))
    //   return(res.json())
    // })
    // .then((json)=>{

    //   var posts = json.posts.slice()
    //   console.log(words)
    //   this.setState({

    //     posts:posts,
    //     endIndex:posts.length
    //   })
    //   console.log(this.state.bagOfWords)

    // })
    // .catch((err) => {
    //   console.error(err);
    // });
   

  }
  componentDidMount(){
    // this.myRef.scrollToEnd({animated:true})
    
    const updateDimensions=()=>{
      
      // if(isMobile==true){
      //   this.setState({
      //     height:Math.floor(Dimensions.get('screen').height),
      //     width:Math.floor(Dimensions.get('screen').width)
      //   })
      // }
      // else{
        
      // }

      if(Math.floor(Dimensions.get('window').width>Math.floor(Dimensions.get('window').height))){
        portrait=false
      }
      else if(Math.floor(Dimensions.get('window').width<=Math.floor(Dimensions.get('window').height))){
        portrait=true
      }
      if(isMobile){

        if(Math.floor((Dimensions.get('window').height)-230)*560/315>(Dimensions.get('window').width-60)){
            //base on width
            var iframeWidth=Math.floor(Dimensions.get('window').width-60)
            var iframeHeight=Math.floor((Dimensions.get('window').width-60)*315/560)

        }
        else if(Math.floor((Dimensions.get('window').width)-60)*315/560>(Dimensions.get('window').height-230)){
            //base on height
            var iframeWidth=Math.floor(Dimensions.get('window').height-230)*560/315
            var iframeHeight=Math.floor(Dimensions.get('window').height-230)
        }
    }
    else{
        
        if(Math.floor((Dimensions.get('window').height)-230)*560/315>(Dimensions.get('window').width-60)){
            //base on width
            var iframeWidth=Math.floor(Dimensions.get('window').width-60)
            var iframeHeight=Math.floor((Dimensions.get('window').width-60)*315/560)

        }
        else if(Math.floor((Dimensions.get('window').width)-60)*315/560>(Dimensions.get('window').height-230)){
            //base on height
            // var iframeWidth=Math.floor(Dimensions.get('window').height-230)*560/315
            // var iframeHeight=Math.floor(Dimensions.get('window').height-230)
            var iframeWidth=Math.floor(Dimensions.get('window').width)
            var iframeHeight=Math.floor(Dimensions.get('window').height-100)
        }
    }
    this.setState({
      height:Math.floor(Dimensions.get('window').height),
      width:Math.floor(Dimensions.get('window').width),
      iframeWidth:iframeWidth,
      iframeHeight:iframeHeight
    })
        
  }
    
  Dimensions.addEventListener('change',(e)=>{
      updateDimensions()
  })
  updateDimensions()
  const updatePosts=(posts)=>{
    this.setState({
      posts:posts
    })
  }

    // this.requestWords()
    // console.log(this.state)
    // var observerOptions ={
    //   root: document.querySelector('#scrollArea'),
    //   rootMargin: '0px',
    //   threshold: 0.5
    // }
    // var observerCallback = function (entreis,observer){
    //   console.log('GoogleDeck.js 206 : observer callback fired')
    // }
    // var observer = new IntersectionObserver(observerCallback,observerOptions)
  //   var temp=[]
  //   const appConsumerKey = 'ZcMcl1wmyAyF3xr1TnkjIlgU8G7xJK1wmoGfG1sULTL1wpWE9t'
  //   const appConsumerSecret='3LIzxmGOfmrjIgT1cHDyECMNrHtxZ3TomNOTCY7sKoOQC3cxjq'
  //   const authorizeUrl = 'https://www.tumblr.com/oauth/authorize';
  //   const requestTokenUrl = 'https://www.tumblr.com/oauth/request_token';
  //   const accessTokenUrl = 'https://www.tumblr.com/oauth/access_token';
  //   const oa = new OAuth(
  //       requestTokenUrl,
  //       accessTokenUrl,
  //       appConsumerKey,
  //       appConsumerSecret,
  //       '1.0A',
  //       'https://squwbs.com',
  //       'HMAC-SHA1'
  //     );

  // oa.getOAuthRequestToken(function (err, token, secret) {
  //   if (err) {
  //     console.error('\tFailed with error', err);
  //   }
  //   console.log('\ttoken %s | secret %s', token, secret);
  //   var oauth={
  //       consumer_key:appConsumerKey,
  //       consumer_secret:appConsumerSecret,
  //       token:token,
  //       token_secret:secret,
  //   }
  //   var blog = new tumblr.Blog('gamutperiod.tumblr.com',oauth)
  //   blog.posts({limit:50,offset:0},function(err,response){
  //       if(err){
  //           console.log(err)
  //       }
  //       for (var i =0; i<response.posts.length; i++){
  //           if(response.posts[i].type=='video'){
  //               if(response.posts[i].video!==undefined){
  //                   if(response.posts[i].video.youtube!==undefined){
  //                       // console.log(i+' '+response.posts[i].type)
  //                       // console.log(response.posts[i].short_url)
  //                       // console.log('postID:',response.posts[i].id)
  //                       // console.log('postTimeStamp:',response.posts[i].timestamp)
  //                       // console.log(response.posts[i].video.youtube.video_id)
  //                       // console.log(response.posts[i].permalink_url)
  //                       // console.log(response.posts[i].trail.post)
  //                       temp.push(
  //                         {
  //                           type:'video',
  //                           url:response.posts[i].short_url,
  //                           id:response.posts[i].id,
  //                           time:response.posts[i].timestamp,
  //                           video:response.posts[i].video.youtube.video_id
  //                         }
  //                       )
  //                   }
  //               }
                
  //           }
            
  //           if(response.posts[i].type=='photo'){
  //               // console.log(i+' '+response.posts[i].type)
  //               // console.log(response.posts[i].short_url)
  //               // console.log('postID:',response.posts[i].id)
  //               // console.log('postTimeStamp:',response.posts[i].timestamp)
  //               var photoList=[]
  //               if(response.posts[i].image_permalink==undefined){
                    
  //                   for(var j = 0; j<response.posts[i].photos.length; j++){
  //                       //console.log(response.posts[i].photos[j].original_size.url)
  //                       //console.log(response.posts[i].photos[j].original_size.width+' X '+response.posts[i].photos[j].original_size.height)
  //                       photoList.push(response.posts[i].photos[j].original_size.url)
  //                   }
  //               }
  //               else{
  //                   //console.log(response.posts[i].image_permalink)
  //                   photoList.push(response.posts[i].image_permalink)
  //               }
  //               temp.push(
  //                 {
  //                   type:'photo',
  //                   url:response.posts[i].short_url,
  //                   id:response.posts[i].id,
  //                   time:response.posts[i].timestamp,
  //                   photo:photoList
  //                 }
  //               )
  //           }
  //           if(response.posts[i].type=='quote'){
  //               // console.log(i+' '+response.posts[i].type)
  //               // console.log(response.posts[i].short_url)
  //               // console.log('postID:',response.posts[i].id)
  //               // console.log('postTimeStamp:',response.posts[i].timestamp)
  //               // console.log(response.posts[i].text)
  //               temp.push(
  //                 {
  //                   type:'quote',
  //                   url:response.posts[i].short_url,
  //                   id:response.posts[i].id,
  //                   time:response.posts[i].timestamp,
  //                   quote:response.posts[i].text
  //                 }
  //               )
  //           }
  //           if(response.posts[i].type=='audio'){
  //               // console.log(i+' '+response.posts[i].type)
  //               // console.log(response.posts[i].short_url)
  //               // console.log('postID:',response.posts[i].id)
  //               // console.log('postTimeStamp:',response.posts[i].timestamp)
  //               // console.log(response.posts[i].audio_url)
  //               temp.push(
  //                 {
  //                   type:'audio',
  //                   url:response.posts[i].short_url,
  //                   id:response.posts[i].id,
  //                   time:response.posts[i].timestamp,
  //                   audio:response.posts[i].audio_url
  //                 }
  //               )
  //           }

  //           if(response.posts[i].type=='text'){
  //               // console.log(i+' '+response.posts[i].type)
  //               // console.log(response.posts[i].short_url)
  //               // console.log('postID:',response.posts[i].id)
  //               // console.log('postTimeStamp:',response.posts[i].timestamp)
  //               // console.log(response.posts[i].body)
  //               temp.push(
  //                 {
  //                   type:'text',
  //                   url:response.posts[i].short_url,
  //                   id:response.posts[i].id,
  //                   time:response.posts[i].timestamp,
  //                   text:response.posts[i].body
  //                 }
  //               )
  //           }
  //           if(response.posts[i].type=='link'){
  //               console.log(i+' '+response.posts[i].type)
  //               console.log(response.posts[i].short_url)
  //               console.log('postID:',response.posts[i].id)
  //               console.log('postTimeStamp:',response.posts[i].timestamp)
  //               console.log(response.posts[i].title)
  //               console.log(response.posts[i].url)
  //               if(response.posts[i].link_image!==undefined){
  //                   console.log(response.posts[i].link_image)
  //                   temp.push(
  //                     {
  //                       type:'link',
  //                       url:response.posts[i].short_url,
  //                       id:response.posts[i].id,
  //                       time:response.posts[i].timestamp,
  //                       link:response.posts[i].url,
  //                       image:response.posts[i].link_image
  //                     }
  //                   )
  //               }
  //               else{
  //                 temp.push(
  //                   {
  //                     type:'link',
  //                     url:response.posts[i].short_url,
  //                     id:response.posts[i].id,
  //                     time:response.posts[i].timestamp,
  //                     link:response.posts[i].url,
  //                     image:undefined
  //                   }
  //                 )
  //               }
  //           }
  //           if(response.posts[i].type=='chat'){
  //               console.log(i+' '+response.posts[i].type)
  //               console.log(response.posts[i].short_url)
  //               console.log('postID:',response.posts[i].id)
  //               console.log('postTimeStamp:',response.posts[i].timestamp)
  //               console.log(response.posts[i].title)
  //               var chatList=[]
  //               for (var j = 0; j<response.posts[i].dialogue.length;j++){
  //                   console.log(response.posts[i].dialogue[j].name+':'+response.posts[i].dialogue[j].phrase)
  //                   chatList.push(String(response.posts[i].dialogue[j].name)+' : '+String(response.posts[i].dialogue[j].phrase))
  //               }
  //               temp.push(
  //                 {
  //                   type:'chat',
  //                   url:response.posts[i].short_url,
  //                   id:response.posts[i].id,
  //                   time:response.posts[i].timestamp,
  //                   url:response.posts[i].url,
  //                   chat:chatList
  //                 }
  //               )
  //           }
            
  //       }
  //       console.log('temppostlist'+stringifyObject(temp))  
  //       //this.setState({posts:temp})
  //       //updatePosts(temp)
  //   })
  // })
  // const getTumblrPostsClient=()=>{
  //       var temp=[]
  //       const appConsumerKey = 'ZcMcl1wmyAyF3xr1TnkjIlgU8G7xJK1wmoGfG1sULTL1wpWE9t'
  //       const appConsumerSecret='3LIzxmGOfmrjIgT1cHDyECMNrHtxZ3TomNOTCY7sKoOQC3cxjq'
  //       const authorizeUrl = 'https://www.tumblr.com/oauth/authorize';
  //       const requestTokenUrl = 'https://www.tumblr.com/oauth/request_token';
  //       const accessTokenUrl = 'https://www.tumblr.com/oauth/access_token';
  //       const oa = new OAuth(
  //           requestTokenUrl,
  //           accessTokenUrl,
  //           appConsumerKey,
  //           appConsumerSecret,
  //           '1.0A',
  //           'https://squwbs.com',
  //           'HMAC-SHA1'
  //       );

  //       oa.getOAuthRequestToken(function (err, token, secret) {
  //           if (err) {
  //           console.error('\tFailed with error getTumblrPosts', err);
  //           }
  //           console.log('\ttoken %s | secret %s', token, secret);
  //           var oauth={
  //               consumer_key:appConsumerKey,
  //               consumer_secret:appConsumerSecret,
  //               token:token,
  //               token_secret:secret,
  //           }
        
    
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
  //                               {
  //                                   type:'video',
  //                                   url:response.posts[i].short_url,
  //                                   id:response.posts[i].id,
  //                                   time:response.posts[i].timestamp,
  //                                   video:response.posts[i].video.youtube.video_id
  //                               }
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
  //             console.log('this is the posts returned : ',stringifyObject(posts,{
  //               indent: ' ',
  //               singleQuotes:false
  //             }))
  //             return temp
  //         })
   
  //   }
  // }

    // const getTumblrPosts=()=>{
    //   var temp=[]
      
    //   fetch('https://squwbs-252702.appspot.com/tumblrAuth', { 
    //       mode:'cors'
    //   })
    //   .then(result=>{
    //     return result.json()
    //   })
    //   .then((json)=>{
    //     console.log('tumblrAuth returns : ',json)
    //     var oauth=json
    //     var blog = new tumblr.Blog('gamutperiod.tumblr.com',oauth)
    //     blog.posts({limit:50,offset:0},function(err,response){
    //         if(err){
    //             console.log(err)
    //         }
    //         for (var i =0; i<response.posts.length; i++){
    //             if(response.posts[i].type=='video'){
    //                 if(response.posts[i].video!==undefined){
    //                     if(response.posts[i].video.youtube!==undefined){
    //                         temp.push(
    //                         {
    //                             type:'video',
    //                             url:response.posts[i].short_url,
    //                             id:response.posts[i].id,
    //                             time:response.posts[i].timestamp,
    //                             video:response.posts[i].video.youtube.video_id
    //                         }
    //                         )
    //                     }
    //                 }
                    
    //             }
                
    //             if(response.posts[i].type=='photo'){
    //                 var photoList=[]
    //                 if(response.posts[i].image_permalink==undefined){
                        
    //                     for(var j = 0; j<response.posts[i].photos.length; j++){
    //                         photoList.push(response.posts[i].photos[j].original_size.url)
    //                     }
    //                 }
    //                 else{
    //                     photoList.push(response.posts[i].image_permalink)
    //                 }
    //                 temp.push(
    //                 {
    //                     type:'photo',
    //                     url:response.posts[i].short_url,
    //                     id:response.posts[i].id,
    //                     time:response.posts[i].timestamp,
    //                     photo:photoList
    //                 }
    //                 )
    //             }
    //             if(response.posts[i].type=='quote'){
    //                 temp.push(
    //                 {
    //                     type:'quote',
    //                     url:response.posts[i].short_url,
    //                     id:response.posts[i].id,
    //                     time:response.posts[i].timestamp,
    //                     quote:response.posts[i].text
    //                 }
    //                 )
    //             }
    //             if(response.posts[i].type=='audio'){
    //                 temp.push(
    //                 {
    //                     type:'audio',
    //                     url:response.posts[i].short_url,
    //                     id:response.posts[i].id,
    //                     time:response.posts[i].timestamp,
    //                     audio:response.posts[i].audio_url
    //                 }
    //                 )
    //             }

    //             if(response.posts[i].type=='text'){
    //                 temp.push(
    //                 {
    //                     type:'text',
    //                     url:response.posts[i].short_url,
    //                     id:response.posts[i].id,
    //                     time:response.posts[i].timestamp,
    //                     text:response.posts[i].body
    //                 }
    //                 )
    //             }
    //             if(response.posts[i].type=='link'){
    //                 if(response.posts[i].link_image!==undefined){
    //                     temp.push(
    //                     {
    //                         type:'link',
    //                         url:response.posts[i].short_url,
    //                         id:response.posts[i].id,
    //                         time:response.posts[i].timestamp,
    //                         link:response.posts[i].url,
    //                         image:response.posts[i].link_image
    //                     }
    //                     )
    //                 }
    //                 else{
    //                 temp.push(
    //                     {
    //                     type:'link',
    //                     url:response.posts[i].short_url,
    //                     id:response.posts[i].id,
    //                     time:response.posts[i].timestamp,
    //                     link:response.posts[i].url,
    //                     image:undefined
    //                     }
    //                 )
    //                 }
    //             }
    //             if(response.posts[i].type=='chat'){
    //                 var chatList=[]
    //                 for (var j = 0; j<response.posts[i].dialogue.length;j++){
    //                     console.log(response.posts[i].dialogue[j].name+':'+response.posts[i].dialogue[j].phrase)
    //                     chatList.push(String(response.posts[i].dialogue[j].name)+' : '+String(response.posts[i].dialogue[j].phrase))
    //                 }
    //                 temp.push(
    //                 {
    //                     type:'chat',
    //                     url:response.posts[i].short_url,
    //                     id:response.posts[i].id,
    //                     time:response.posts[i].timestamp,
    //                     url:response.posts[i].url,
    //                     chat:chatList
    //                 }
    //                 )
    //             }
                
    //         }
    //         //console.log(temp)
    //         //window.posts=temp
    //         console.log('this is the getTumblrPosts returned : ',stringifyObject(temp,{
    //           indent: ' ',
    //           singleQuotes:false
    //         }))
    //         return temp
    //     })
    //   })
    //   .catch((err)=>{
    //     console.log(err)
    //   })
      
      
      
    // }

      
      fetch('https://squwbs-252702.appspot.com/tumblr', { 
          mode:'cors'
      })
      .then(result=>{
        return result.json()
      })
      .then((json)=>{
        console.log('/tumblr returns : ',json)
        this.setState({posts:json.posts})
      })
      .catch((err)=>{
        console.log(err)
      })
      //var posts = getTumblrPosts()
      //var posts = getTumblrPosts()
      // console.log('posts : ',stringifyObject(posts,{
      //     indent: ' ',
      //     singleQuotes:false
      // }))
      // console.log('posts : ',posts)
      //this.setState({posts:posts})
  }
  componentDidUpdate(){
    
    
    
}
  onMouseEnter=()=>{
    console.log('googledeck.js fired on mouse enter')
    //this.myRef.showsHorizontalScrollIndicator=true
    this.setState({indicatorState:true})
    //console.log(this.myRef.current.offsetWidth)
   // this.myRef.scrollTo({x:(this.state.width-30)*this.state.currentEntry,y:0})
  }

  onMouseLeave=()=>{
    console.log('googledeck.js fired on mouse leave')
    //this.myRef.showsHorizontalScrollIndicator=false
    this.setState({indicatorState:false})
  }
  onScroll = (e)=>{
    var maxNum=e.nativeEvent.contentSize.width-(this.state.width-30)
    //console.log(e.nativeEvent.contentOffset.x+'/'+maxNum)
    if(e.nativeEvent.contentOffset.x%(this.state.width-30)<(this.state.width-30)/2){
      // if (this.state.currentEntry!==Math.floor(e.nativeEvent.contentOffset.x/(this.state.width-30))){
        this.setState({
          currentEntry:Math.floor(e.nativeEvent.contentOffset.x/(this.state.width-30))
        })
        //console.log(Math.floor(e.nativeEvent.contentOffset.x/(this.state.width-30)))
      // }
      
      
    }
    else if (e.nativeEvent.contentOffset.x%(this.state.width-30)>=(this.state.width-30)/2){
      // if (this.state.currentEntry!==Math.floor(e.nativeEvent.contentOffset.x/(this.state.width-30))){
        this.setState({
          currentEntry:Math.ceil(e.nativeEvent.contentOffset.x/(this.state.width-30))
        })
        //console.log(Math.ceil(e.nativeEvent.contentOffset.x/(this.state.width-30)))
      // }
    }
  }
 
  render(){
      
    


      if(isMobile){
        if(portrait==false){
        return (
          <Fade
                    duration={270}
                    timeout={270}
                >
          <View
            style={{
              //borderWidth:4,
              //borderColor:'transparent',
              backgroundColor:'transparent',
              paddingTop:0,
              paddingLeft:0,
              paddingRight:0,
              margin:0,
              width:this.state.width-30,
              height:this.state.iframeHeight+60,
              //width:this.state.width-18,
              zIndex:99,
              transform:[{
                translateX:0,
              },
              {
                translateY:-67,
              }]
            }
            }
          >
         
            <TouchableOpacity
              onPress={this.touchedPost}
              activeOpacity={1}
            >
            <ScrollView
                ref={ref=>this.myRef=ref}
                //ref={this.myRef}
                style={{
                    // display:'absolute',
                    // left:0,
                    
                    transform:[{
                      translateX:0,
                    },
                    {
                      translateY:0,
                    }
                  ],
                    //height:this.state.height-70,
                    //height:this.state.height-74,
                    //height:this.state.iframeHeight+105,
                    //height:this.state.iframeHeight+207,
                    height:this.state.iframeHeight+150,
                    //height:'100%',
                    width:this.state.width-30,
                    //width:this.state.width-30,
                    backgroundColor:'transparent',
                    //backgroundColor:'rgb(175,175,175)',
                    margin:0,
                    flexDirection:'row',
                    paddingTop:20,
                    paddingLeft:0,
                    paddingRight:0,
                    paddingBottom:0,
                    // paddingBottom:15,
                    // paddingRight:15,
                    //backgroundColor:'transparent',
                    //borderColor:'transparent',
                    //borderWidth:4,
                    //borderStyle:'solid',
                    //padding:0,
                    zIndex:98
                }}
                onScroll={this.onScroll}
                scrollEventThrottle={16}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                //showsHorizontalScrollIndicator={this.state.indicatorState}
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
            data={this.state.posts}
            renderItem={() => this.createPostsList()}
            keyExtractor={() => uuidv4()}
        /> */}
          
          
            {this.createPostsList()}
          
        
          </ScrollView> 
                
                  <View
                    style={{
                      transform:[{
                          translateX:0,
                        },
                        {
                          translateY:-55,
                        }
                      ],
                      justifyContent:'center',
                      alignItems:'center',
                      backgroundColor:'white',
                      //backgroundColor:'rgba(256,256,256,0.9)',
                      width:this.state.width-30,
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
                          width:this.state.width-60,
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
                              width:(this.state.width-30)/4,
                              backgroundColor:'transparent',
                              alignItems:'center',
                              justifyContent:'center'
                          }}
                      >
                          {/* <TouchableOpacity
                            //onPress={this.props.slackHashButtonPressed}
                            onPress={this.slackHashButtonPressed}
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
                              width:(this.state.width-30)/4,
                              backgroundColor:'transparent',
                              alignItems:'center',
                              justifyContent:'center'
                          }}
                      >
                          {/* <TouchableOpacity
                            //onPress={this.props.starButtonPressed}
                            onPress={this.starButtonPressed}
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
                              width:(this.state.width-30)/4,
                              backgroundColor:'transparent',
                              alignItems:'center',
                              justifyContent:'center'
                          }}
                      >
                          {/* <TouchableOpacity
                            //onPress={this.props.shareButtonPressed}
                            onPress={this.shareButtonPressed}
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
                              width:(this.state.width-30)/4,
                              backgroundColor:'transparent',
                              alignItems:'center',
                              justifyContent:'center'
                          }}
                      >
                          {/* <TouchableOpacity
                           
                            onPress={this.slackHashButtonPressed}
                          >
                          <Text
                              className='icon'
                              style ={styles.icon}
                          >   
                          
                              <i class="fab fa-slack-hash"></i>
                          
                             
                          </Text>
                          </TouchableOpacity> */}
                      </View>
                      
                  </View>
                
                  </View>
                
                </TouchableOpacity>
        </View>    
        </Fade>  
              
         
          
        );
        }
        else if(portrait==true){
          return (
            <Fade
                      duration={270}
                      timeout={270}
                  >
            <View
              style={{
                //borderWidth:4,
                //borderColor:'transparent',
                backgroundColor:'transparent',
                paddingTop:0,
                paddingLeft:0,
                paddingRight:0,
                margin:0,
                width:this.state.width-30,
                height:this.state.iframeHeight+60,
                //width:this.state.width-18,
                zIndex:99,
                transform:[{
                  translateX:0,
                },
                {
                  translateY:-67,
                }]
              }
              }
            >
           
              <TouchableOpacity
                onPress={this.touchedPost}
                activeOpacity={1}
              >
              <ScrollView
                  ref={ref=>this.myRef=ref}
                  //ref={this.myRef}
                  style={{
                      // display:'absolute',
                      // left:0,
                      
                      transform:[{
                        translateX:0,
                      },
                      {
                        translateY:0,
                      }
                    ],
                      //height:this.state.height-70,
                      //height:this.state.height-74,
                      //height:this.state.iframeHeight+105,
                      //height:this.state.iframeHeight+207,
                      height:this.state.iframeHeight+110,
                      //height:'100%',
                      width:this.state.width-30,
                      //width:this.state.width-30,
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
                      //borderColor:'transparent',
                      //borderWidth:4,
                      //borderStyle:'solid',
                      //padding:0,
                      zIndex:98
                  }}
                  onScroll={this.onScroll}
                  scrollEventThrottle={16}
                  onMouseEnter={this.onMouseEnter}
                  onMouseLeave={this.onMouseLeave}
                  horizontal={true}
                  showsHorizontalScrollIndicator={true}
                  //showsHorizontalScrollIndicator={this.state.indicatorState}
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
              data={this.state.posts}
              renderItem={() => this.createPostsList()}
              keyExtractor={() => uuidv4()}
          /> */}
            
            
              {this.createPostsList()}
            
          
            </ScrollView> 
              <View
                style={{
                  transform:[{
                      translateX:0,
                    },
                    {
                      translateY:-95,
                    }
                  ],
                  zIndex:99,
                  justifyContent:'center',
                  alignItems:'center',
                  backgroundColor:'black',
                  width:this.state.width-30,
                  height:50,
                }}
              >
                <Text
                  selectable={false}
                  style={{
                    color:'transparent'
                  }}
                >
                  bars
                </Text>
              </View>    
                    <View
                      style={{
                        transform:[{
                            translateX:0,
                          },
                          {
                            translateY:-105,
                          }
                        ],
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'white',
                        //backgroundColor:'rgba(256,256,256,0.9)',
                        width:this.state.width-30,
                        height:50,
                        //borderWidth:4,
                        //borderRadius:4,
                        //borderColor:'transparent',
                        zIndex:100,
  
                      }}
                    >
                    
                    <View
                        style={{
                            //position:'absolute',
                            flexDirection:'row',
                            width:this.state.width-60,
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
                                width:(this.state.width-30)/4,
                                backgroundColor:'transparent',
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            {/* <TouchableOpacity
                              //onPress={this.props.slackHashButtonPressed}
                              onPress={this.slackHashButtonPressed}
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
                                width:(this.state.width-30)/4,
                                backgroundColor:'transparent',
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            {/* <TouchableOpacity
                              //onPress={this.props.starButtonPressed}
                              onPress={this.starButtonPressed}
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
                                width:(this.state.width-30)/4,
                                backgroundColor:'transparent',
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            {/* <TouchableOpacity
                              //onPress={this.props.shareButtonPressed}
                              onPress={this.shareButtonPressed}
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
                                width:(this.state.width-30)/4,
                                backgroundColor:'transparent',
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            {/* <TouchableOpacity
                              
                              onPress={this.slackHashButtonPressed}
                            >
                            <Text
                                className='icon'
                                style ={styles.icon}
                            >   
                            
                                <i class="fab fa-slack-hash"></i>
                            
                            </Text>
                            </TouchableOpacity> */}
                        </View>
                        
                    </View>
                  
                    </View>
                  
                  </TouchableOpacity>
          </View>    
          </Fade>  
                
           
            
          );
        }

      }
      else{
        if(isWindows()){ 
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
                //width:this.state.width-30,
                width:this.state.width-18,
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
                onPress={this.touchedPost}
                activeOpacity={1}
              >
              <ScrollView
                  ref={ref=>this.myRef=ref}
                  //ref={this.myRef}
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
                      //height:this.state.height-70,
                      //height:this.state.height-74,
                      //height:this.state.iframeHeight+105,
                      transform:[{
                        translateX:14,
                      },
                      {
                        translateY:4,
                      }],
                      height:this.state.iframeHeight+90,
                      //height:'100%',
                      width:this.state.width-38,
                      //width:this.state.width-30,
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
                  onScroll={this.onScroll}
                  scrollEventThrottle={16}
                  onMouseEnter={this.onMouseEnter}
                  onMouseLeave={this.onMouseLeave}
                  horizontal={true}
                  showsHorizontalScrollIndicator={true}
                  //showsHorizontalScrollIndicator={this.state.indicatorState}
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
              data={this.state.posts}
              renderItem={() => this.createPostsList()}
              keyExtractor={() => uuidv4()}
          /> */}
        
              {this.createPostsList()}
          
            </ScrollView> 
                  
                    <View
                      style={{
                        transform:[{
                            translateX:0,
                          },
                          {
                            translateY:-67,
                          }
                        ],
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'white',
                        width:this.state.width-18,
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
                            width:this.state.width-60,
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
                                width:(this.state.width-30)/4,
                                backgroundColor:'transparent',
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            {/* <TouchableOpacity
                              //onPress={this.props.slackHashButtonPressed}
                              onPress={this.slackHashButtonPressed}
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
                                width:(this.state.width-30)/4,
                                backgroundColor:'transparent',
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            {/* <TouchableOpacity
                              //onPress={this.props.starButtonPressed}
                              onPress={this.starButtonPressed}
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
                                width:(this.state.width-30)/4,
                                backgroundColor:'transparent',
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            {/* <TouchableOpacity
                              //onPress={this.props.shareButtonPressed}
                              onPress={this.shareButtonPressed}
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
                                width:(this.state.width-30)/4,
                                backgroundColor:'transparent',
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            <TouchableOpacity
                              //onPress={this.props.commentButtonPressed}
                              onPress={this.commentButtonPressed}
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
        else{
          return (
            <Fade
                      duration={270}
                      timeout={270}
                  >
            <View
              style={{
                // borderWidth:4,
                // borderColor:'transparent',
                backgroundColor:'transparent',
                paddingTop:0,
                paddingLeft:0,
                paddingRight:0,
                margin:0,
                width:this.state.width-30,
                //width:this.state.width-18,
                zIndex:99,
                transform:[{
                  translateX:0,
                },
                {
                  translateY:-10,
                }]
              }
              }
            >
          
              <TouchableOpacity
                onPress={this.touchedPost}
                activeOpacity={1}
              >
              <ScrollView
                  ref={ref=>this.myRef=ref}
                  //ref={this.myRef}
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
                      //height:this.state.height-70,
                      //height:this.state.height-74,
                      //height:this.state.iframeHeight+105,
                      transform:[{
                        translateX:0,
                      },
                      {
                        translateY:0,
                      }],
                      height:this.state.iframeHeight+90,
                      //height:'100%',
                      width:this.state.width-30,
                      //width:this.state.width-30,
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
                      // borderColor:'transparent',
                      // borderWidth:4,
                      // borderStyle:'solid',
                      padding:0,
                      zIndex:98
                  }}
                  onScroll={this.onScroll}
                  scrollEventThrottle={16}
                  onMouseEnter={this.onMouseEnter}
                  onMouseLeave={this.onMouseLeave}
                  horizontal={true}
                  showsHorizontalScrollIndicator={true}
                  //showsHorizontalScrollIndicator={this.state.indicatorState}
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
              data={this.state.posts}
              renderItem={() => this.createPostsList()}
              keyExtractor={() => uuidv4()}
          /> */}
        
              {this.createPostsList()}
          
            </ScrollView> 
                  
                    <View
                      style={{
                        transform:[{
                            translateX:0,
                          },
                          {
                            translateY:-75,
                          }
                        ],
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'white',
                        width:this.state.width-30,
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
                            width:this.state.width-60,
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
                                width:(this.state.width-30)/4,
                                backgroundColor:'transparent',
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            {/* <TouchableOpacity
                              //onPress={this.props.slackHashButtonPressed}
                              onPress={this.slackHashButtonPressed}
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
                                width:(this.state.width-30)/4,
                                backgroundColor:'transparent',
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            {/* <TouchableOpacity
                              //onPress={this.props.starButtonPressed}
                              onPress={this.starButtonPressed}
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
                                width:(this.state.width-30)/4,
                                backgroundColor:'transparent',
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            {/* <TouchableOpacity
                              //onPress={this.props.shareButtonPressed}
                              onPress={this.shareButtonPressed}
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
                                width:(this.state.width-30)/4,
                                backgroundColor:'transparent',
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            <TouchableOpacity
                              //onPress={this.props.commentButtonPressed}
                              onPress={this.commentButtonPressed}
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



