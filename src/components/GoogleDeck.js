import React,{Component,useContext} from 'react';
import {Animated,PanResponder,Dimensions,View,Text,Image,TouchableHighlight,TouchableOpacity,StyleSheet,FlatList,ScrollView} from 'react-native'
import { Context } from "../context";
import ReactDOM from 'react-dom'
import GoogleCard from './GoogleCard'
//import WordCardV2 from './WordCardV2'
import stringifyObject from 'stringify-object'
//const MongoClient = require('mongodb').MongoClient;
//import {swing} from "react-animations"
//import styled, { keyframes } from 'styled-components'
//import Radium, {StyleRoot} from 'radium'

//the following svg is downloaded from fontawesome
//https://fontawesome.com/license
import pointer from './icons/pointer.svg'


//import './css/Zoom.css'

import './css/Pointer.css'
const uuidv4 = require('uuid/v4');

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
            title:'second',
            date:'2001/2/4',
            picture:null,
            writer:'json',
            youtubeID:null,
            post:'2',
            stars:4.5,
            comments:[
                {
                    title:'random 3',
                    date:'2001/2/6',
                    picture:null,
                    writer:'commentor',
                    youtubeID:null,
                    post:'comment one',
                    stars:2.5,
                    comments:[],
                    hashs:['third'],
                  },
            ],
            hashs:['second','mirror','more','examples'],
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
      indicatorState:true
    };
    this.myRef=React.createRef();
  
    

  }
  shuffle=(a)=>{
    
  }
  createPostsList = () =>{
    let parent = []
    //var length=this.state.posts.length
    this.state.posts.map((post,i,arr)=>{
      //console.log(arr)
      //if(i==length){
        parent.push(
          <View
              id='lastPost'
              style={{
                  //height:this.state.height-80,
                  //width:this.state.width-30,
                  height:this.state.height-30,
                  width:this.state.width-30,
                  backgroundColor:'transparent',
                  borderColor:'transparent',
                  borderWidth:'2',
                  borderStyle:'solid',
                  //justifyContent:'center',
                  alignItems:'center'

                  // marginLeft:15,
                  // mariginRight:15
              }}
          >
              <GoogleCard
                  title={post.title}
                  date={post.date}
                  picture={post.picture}
                  writer={post.writer}
                  youtubeID={post.youtubeID}
                  post={post.post}
                  stars={post.stars}
                  comments={post.comments}
                  hashs={post.hashs}
                  commentButtonPressed={post.commentButtonPressed}
                  slackButtonPressed={post.slackButtonPressed}
                  starButtonPressed={post.startButtonPressed}
              />
          </View>
      )
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
        this.setState({
            height:Math.floor(Dimensions.get('window').height),
            width:Math.floor(Dimensions.get('window').width)
        })
        
    }
    
    Dimensions.addEventListener('change',(e)=>{
        updateDimensions()
    })
    updateDimensions()
      
    // this.requestWords()
    console.log(this.state)
    var observerOptions ={
      root: document.querySelector('#scrollArea'),
      rootMargin: '0px',
      threshold: 0.5
    }
    var observerCallback = function (entreis,observer){
      console.log('GoogleDeck.js 206 : observer callback fired')
    }
    var observer = new IntersectionObserver(observerCallback,observerOptions)
  }
  componentDidUpdate(){
    
    
    
}
  onMouseEnter=()=>{
    console.log('googledeck.js fired on mouse enter')
    //this.myRef.showsHorizontalScrollIndicator=true
    this.setState({indicatorState:true})
    //console.log(this.myRef.current.offsetWidth)
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
      if (this.state.currentEntry!==Math.floor(e.nativeEvent.contentOffset.x/(this.state.width-30))){
        this.setState({
          currentEntry:Math.floor(e.nativeEvent.contentOffset.x/(this.state.width-30))
        })
        console.log(Math.floor(e.nativeEvent.contentOffset.x/(this.state.width-30)))
      }
      
      
    }
    else if (e.nativeEvent.contentOffset.x%(this.state.width-30)>=(this.state.width-30)/2){
      if (this.state.currentEntry!==Math.floor(e.nativeEvent.contentOffset.x/(this.state.width-30))){
        this.setState({
          currentEntry:Math.ceil(e.nativeEvent.contentOffset.x/(this.state.width-30))
        })
        console.log(Math.ceil(e.nativeEvent.contentOffset.x/(this.state.width-30)))
      }
    }
  }
 
  render(){
      
      
        return (
          <View>
            <ScrollView
                ref={ref=>this.myRef=ref}
                style={{
                    // display:'absolute',
                    // left:0,
                    height:this.state.height-80,
                    width:this.state.width-30,
                    backgroundColor:'white',
                    //backgroundColor:'rgb(175,175,175)',
                    margin:0,
                    flexDirection:'row',
                    
                    // paddingBottom:15,
                    // paddingRight:15,
                }}
                onScroll={this.onScroll}
                scrollEventThrottle={16}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                horizontal={true}
                //showsHorizontalScrollIndicator={false}
                showsHorizontalScrollIndicator={this.state.indicatorState}
                snapeToAlignment='end'
                decelerationRate="fast"
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
                      justifyContent:'center',
                      alignItems:'center',
                      backgroundColor:'transparent',
                      width:this.state.width-30,
                      height:50
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
                              width:(this.state.width-35)/4,
                              backgroundColor:'transparent',
                              alignItems:'center',
                              justifyContent:'center'
                          }}
                      >
                          <TouchableOpacity
                            onPress={this.props.commentButtonPressed}
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
                      <View
                          style={{
                              flexDirection:'row',
                              width:(this.state.width-35)/4,
                              backgroundColor:'transparent',
                              alignItems:'center',
                              justifyContent:'center'
                          }}
                      >
                          <TouchableOpacity
                            onPress={this.props.slackHashButtonPressed}
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
                      <View
                          style={{
                              flexDirection:'row',
                              width:(this.state.width-35)/4,
                              backgroundColor:'transparent',
                              alignItems:'center',
                              justifyContent:'center'
                          }}
                      >
                          <TouchableOpacity
                            onPress={this.props.starButtonPressed}
                          >
                          <Text
                              className='icon'
                              style ={[
                                  styles.icon,
                                  
                              ]
                                  
                              }
                          >
                              {/* <i class="fas fa-heart"></i> */}
                              <i class="fas fa-star"></i> 
                          </Text>
                          </TouchableOpacity>
                      </View>
                      <View
                          style={{
                              flexDirection:'row',
                              width:(this.state.width-35)/4,
                              backgroundColor:'transparent',
                              alignItems:'center',
                              justifyContent:'center'
                          }}
                      >
                          <TouchableOpacity
                            onPress={this.props.shareButtonPresse}
                          >
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
      fontSize: 14,
      fontWeight:'700',
      
      textAlign:'center',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row',
  }
});

export default GoogleDeck;



