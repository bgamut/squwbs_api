//import React, {memo} from 'react'
import React,{Component,useContext,useState,useEffect,memo} from 'react';
import {Animated,TouchableOpacity,TouchableHighlight,PanResponder,Text,View,KeyboardAvoidingView,ScrollView,Dimensions} from 'react-native'
import HorizontalSwipeElements from './HorizontalSwipeElements'
import SwipeableList from './SwipeableList'
import SwipeableScroller from './SwipeableScroller'
import WordDeckWrapper from './WordDeckWrapper'
import Swiper from './Swiper'
import AddPost from './AddPost'
import Header from './Header'
import Drawer from './Drawer'
import FileDrop from './FileDrop'
import {Context} from '../context'

//import AdSense from 'react-adsense';
// import UploadWords from './UploadWords'
// import SplitScreenV2 from './SplitScreenV2'
// import ReadPDF from './ReadPDF'

import {Rnd} from 'react-rnd'
const withQuery = require('with-query').default


var diff = require('object-diff')
const _ = require('lodash')
const stringifyObject= require('stringify-object')
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



const addUserToServer = (obj)=>{
  
  console.log('user add function entered')
  fetch(withQuery('https://squwbs.herokuapp.com/user', {
    ...obj,
    mode:'cors'
  }))
  .then(result=>{
      console.log('got result from user fetch')
      return result.json()
    })
    .then((json)=>{
      //setState({...state,userData:{...json}})
      
      console.log(stringifyObject(json))
      return json
    })
    .catch((err)=>{
      console.error(err)
    })
}

const Home = () => {
  //run()
  const [state,setState]=useState(Context)
  const [user,setUser]=useState({})
  const getUserData=async()=>{
    const responded= await fetch('https://squwbs.herokuapp.com/readCookies',{mode:'cors'})
    const userCookie = await responded.json()
    console.log('userCookie : '+stringifyObject(userCookie))
    if(Object.keys(userCookie).length>1){
      console.log('user info sent to server')
      fetch(withQuery('https://squwbs.herokuapp.com/user', {
        ...userCookie,
        mode:'cors'
      }))
      .then(result=>{
          console.log('got result from user fetch')
          return result.json()
        })
        .then((json)=>{
          setState({...state,userData:json.message})
          
          console.log(stringifyObject(json))
          setUser(json)
        })
        .catch((err)=>{
          console.error(err)
        })
      
    }
    
  }

  useEffect(()=>{
    //getUserData()
  },[])

  useEffect(()=>{
    console.log(stringifyObject(user)=='{}')
    console.log(user)
  },[user])
  
    const longpress=()=>{
      alert('longpress')
    }
    return(

 
      <View style={{height:Dimensions.get('window').height}}>
        {/* <AdSense.Google 
          client='NeM-xU1bQwBXyU8dz_MsINZX'
          slot='7806394673'
          style={{height:50,width:200,display:'block'}}
          layout='in-article'
          format='fluid'
        />   */}
          <Drawer>
            <SwipeableScroller/>
          </Drawer>
          {/* <KeyboardAvoidingView style={{display:'absolute',bottom:0,flex:1,position:'absolute',height:hp('16%')-30,backgroundColor:'transparent',flexDirection:'column',margin:0,width:wp('100%'),padding:0}} behavior="padding" enabled > */}
          {/* <KeyboardAvoidingView style={{display:'absolute',bottom:0,position:'absolute',height:Dimensions.get('window').height*5/30-30,backgroundColor:'transparent',flexDirection:'column',margin:0,width:Dimensions.get('window').width,padding:0}} behavior="padding" enabled >
          
          
              <View style={{backgroundColor:'white',height:30,felxDirection:'column',alignItems:'center',justifyContent:'center',marginRight:0,marginLeft:0,}}>
                <AddPost style={{marginTop:0,witdh:Dimensions.get('window').width}}/>
              </View>
    
              <ScrollView 
                horizontal = {true} 
                style={{height:Dimensions.get('window').height/15,backgroundColor:'transparent',flexDirection:'row',marginLeft:0,marginRight:0}} 
                showsHorizontalScrollIndicator={false}
              >
                <TouchableHighlight underlayColor = 'white' onLongPress={longpress}>
                <View style={{
                  height:Dimensions.get('window').height/15,
                  width:(Dimensions.get('window').height)/12,
                  backgroundColor:'darkgrey',
                  flex:1,
                  flexDirection:'column',
                  marginRight:2,
                  marginLeft:3,
                  borderRadius:4,
                  borderColor:'white',
                  overflow:'hidden'
                  }}>
                 
                </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor = 'white' onLongPress={longpress}>
                <View style={{
                  height:Dimensions.get('window').height/15,
                  width:(Dimensions.get('window').height)/12,
                  backgroundColor:'darkgrey',
                  flex:1,
                  flexDirection:'column',
                  marginRight:2,
                  marginLeft:2,
                  borderRadius:4,
                  borderColor:'white',
                  overflow:'hidden'
                  }}>
                
                </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor = 'white' onLongPress={longpress}>
                <View style={{
                  height:Dimensions.get('window').height/15,
                  width:(Dimensions.get('window').height)/12,
                  backgroundColor:'darkgrey',
                  flex:1,
                  flexDirection:'column',
                  marginRight:2,
                  marginLeft:2,
                  borderRadius:4,
                  borderColor:'white',
                  overflow:'hidden'
                  }}>
                
                </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor = 'white' onLongPress={longpress}>
                <View style={{
                  height:Dimensions.get('window').height/15,
                  width:(Dimensions.get('window').height)/12,
                  backgroundColor:'darkgrey',
                  flex:1,
                  flexDirection:'column',
                  marginRight:2,
                  marginLeft:2,
                  borderRadius:4,
                  borderColor:'white',
                  overflow:'hidden'
                }}>
               
                </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor = 'white' onLongPress={longpress}>
                <View style={{
                  height:Dimensions.get('window').height/15,
                  width:(Dimensions.get('window').height)/12,
                  backgroundColor:'darkgrey',
                  flex:1,
                  flexDirection:'column',
                  marginRight:2,
                  marginLeft:2,
                  borderRadius:4,
                  borderColor:'white',
                  overflow:'hidden'
                }}>
            
                </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor = 'white' onLongPress={longpress}>
                <View style={{
                  height:Dimensions.get('window').height/15,
                  width:(Dimensions.get('window').height)/12,
                  backgroundColor:'darkgrey',
                  flex:1,
                  flexDirection:'column',
                  marginRight:2,
                  marginLeft:2,
                  borderRadius:4,
                  borderColor:'white',
                  overflow:'hidden'
                }}>
     
                </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor = 'white' onLongPress={longpress}>
                <View style={{
                  height:Dimensions.get('window').height/15,
                  width:(Dimensions.get('window').height)/12,
                  backgroundColor:'darkgrey',
                  flex:1,
                  flexDirection:'column',
                  marginRight:2,
                  marginLeft:2,
                  borderRadius:4,
                  borderColor:'white',
                  overflow:'hidden'
                }}>
      
                </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor = 'white' onLongPress={longpress}>
                <View style={{
                  height:Dimensions.get('window').height/15,
                  width:(Dimensions.get('window').height)/12,
                  backgroundColor:'darkgrey',
                  flex:1,
                  flexDirection:'column',
                  marginRight:2,
                  marginLeft:2,
                  borderRadius:4,
                  borderColor:'white',
                  overflow:'hidden'
                }}>

                </View>
                </TouchableHighlight>
              </ScrollView>
            </KeyboardAvoidingView>  */}
        </View> 
        
    )
  // }
  }

export default Home
