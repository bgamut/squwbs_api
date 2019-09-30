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
      posts:[
          {
            title:'random 1',
            date:'2001/2/3',
            picture:null,
            writer:'json example',
            youtubeID:null,
            post:'hope this works',
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

      ],
      currentIndex:0,
      endIndex:1,
      next:true
    };
    this.myRef=React.createRef();
  
    

  }
  shuffle=(a)=>{
    
  }
  createPostsList = () =>{
    let parent = []
    this.state.posts.map((post)=>{
        parent.push(
            <View
                style={{
                    height:this.state.height-80,
                    width:this.state.width-30,
                    backgroundColor:'white',
                    borderColor:'purple',
                    borderWidth:'2',
                    borderStyle:'solid',
                    justifyContent:'center',
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
                />
            </View>
        )
    })
    return parent;
}
  addCard=()=>{
   

  }
  abortController= new AbortController()
  UNSAFE_componentWillUnmount(){
    this.abortController.abort()
  }
  
  requestPosts=()=>{
    // fetch('https://squwbs.herokuapp.com/getPosts',[{mode:'cors'},{signal:this.abortController.signal}])
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

  }
  componentDidUpdate(){
    
    
    
}
  


 
 
  render(){
      
      
        return (
            <ScrollView
                // ref={ref=>this.myRef=ref}
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
    
                horizontal={true}
            
                showsHorizontalScrollIndicator={true}
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
              
          
              
        );
    }


}

export default GoogleDeck;



