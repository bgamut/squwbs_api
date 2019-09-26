//import React, {memo} from 'react'
import React,{Component,useContext,useState,useEffect,memo,useRef} from 'react';
import {Animated,TouchableOpacity,TouchableHighlight,PanResponder,Text,View,KeyboardAvoidingView,ScrollView,Dimensions,StyleSheet,Image} from 'react-native'
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
//import xIcon from './icons/X.png'
import Fade from 'react-reveal/Fade'
import './css/x.css'
import './css/Fade.css'
//import AdSense from 'react-adsense';
// import UploadWords from './UploadWords'
// import SplitScreenV2 from './SplitScreenV2'
// import ReadPDF from './ReadPDF'

import {Rnd} from 'react-rnd'
// import FadeInOut from 'react-native-fade-in-out';

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
  const [overlaySwitch,setOverlaySwitch]=useState(false)
  const [fade, setFade] =useState('true')
  const overlay=useRef('')
  const duration=270
  var animatedOpacity = new Animated.Value(0)
  const overlayToggle=()=>{
    //console.log('popLogin from HOME')
    //console.log(overlay.current.props.style.zIndex)
    // if(overlay.current.props.style.zIndex==100){
    //     overlay.current.props.style.zIndex=1
    //     overlay.current.props.style.display='none'
    //     setOverlaySwitch(false)
    //     console.log('block to none')
    // }
    // else{
    //     overlay.current.props.style.zIndex=100
    //     overlay.current.props.style.display='block'
    //     setOverlaySwitch(true)
    //     console.log('none to block')
    // }
    if(overlaySwitch==false){
      setOverlaySwitch(true)
      //setOverlayClassName('fadein')
      
      setFade(true)
      // if(overlay.current!=null){
      //   if(overlay.current.props!=undefined){
      //     //overlay.current.props.style.opacity=value
          
      //     overlay.current.props.className='fadein'
      //     console.log(overlay.current.props.className)
      //     //console.log(overlay.current.props.style.opacity)
      //   }
        
      // }
    }
    else{
      //setOverlayClassName('fadeout')
      setFade(false)
      //console.log('waiting')
      setTimeout(function() {
        //console.log('waited '+ duration+' milliseconds');
        setOverlaySwitch(false)
      }, duration);
      
      
      // if(overlay.current!=null){
      //   if(overlay.current.props!=undefined){
      //     //overlay.current.props.style.opacity=value
          
      //     overlay.current.props.className='fadeout'
      //     console.log(overlay.current.props.className)
      //     //console.log(overlay.current.props.style.opacity)
      //   }
        
      // }
    }
    
  }
  const overlayOff=()=>{


      setOverlaySwitch(false)
    
    
  }
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
    //console.log(stringifyObject(user)=='{}')
    //console.log(user)
    //console.log('fade changed')
  },[fade])
  animatedOpacity.addListener(({value})=>{
    //console.log(value)
    // if(overlay.current!=null){
    //   if(overlay.current.props!=undefined){
    //     //overlay.current.props.style.opacity=value
        
    //     overlay.current.props.style.backgroundColor='rgba(0,0,0,'+value+')'
    //     console.log(overlay.current.props.style.backgroundColor)
    //     //console.log(overlay.current.props.style.opacity)
    //   }
      
    // }
    
    //overlay.current.props.style.opacity=value
    //console.log(state.yscroll)
    //global.headerHeight=value
    //console.log(value)
})
  // useEffect(()=>{
  //   //getUserData()
  //   //console.log('what')
  //   console.log(overlay.current)
  // },[overlayClassName])

    const longpress=()=>{
      alert('longpress')
    }
    return(

 
      <View style={{height:Dimensions.get('window').height}}>
        {/* <div
          ref={overlay}
          className=
          'invisible'
        > */}
        {overlaySwitch && 
        
          <View
          
          // className={overlayClassName}
          style={{
              position:'fixed',
              height:'100%',
              width:'100%',
              top:0,
              left:0,
              //backgroundColor:'rgba(0,0,0,0.4)',
              //
              justifyContent:'center',
              alignItems:'center',
              zIndex:100,
              //opacity:0,
              //display:'block',
          }}
        >
        <Fade
        duration={duration}
        timeout={duration}
        >
        <Fade
          style={{
            //backgroundColor:'orange',
            height:'100vh',
            width:'100vw',
          }}
          when={fade}
          duration={duration}
          timeout={duration}
        >
          <View
          style={{
              
              height:'100vh',
              width:'100vw',
              //opacity:0.4,
              //backgroundColor:'orange',
              backgroundColor:'rgba(0,0,0,0.85)',
              //backgroundImage:'',
              justifyContent:'center',
              alignItems:'center',
              //textAlign:'center'
          }}>
              <TouchableOpacity
              style={{
                  position:'fixed',
                  height:16,
                  width:16,
                  top:26,
                  right:21,
                  //backgroundColor:'white',
                  zIndex:101
              }}
              onPress={
                  overlayToggle
                  //overlayOff
              }
          >
              <div
                className='x'
              >
        
              </div>
              {/* <Text
                  style={{
                      fontSize:16,
                      fontWeight:'700',
                      color:'white',
                      
                  }}
              >
                  <i class="fas fa-times"></i>
                  

                
              </Text> */}
          </TouchableOpacity>
          <View style={styles.box}>
        <a style={
          {
            // flex:1,
            textDecorationLine:'none',
            //borderColor:'black',
            //borderWidth:2,
            backgroundColor:'transparent',
            fontSize: 17,
            fontWeight:700,
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 2,
            // flex:1,
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
            textAlign:'center'
          }
        } href="/login/google">
          <TouchableOpacity style={styles.touch}>
          
          <Text id="linkLoginGoogle" 
          style={{
            // color:'black', 
            textDecorationLine:'none',
            color:'white',
            fontSize: 30,
            fontWeight:'700',
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 2,
            // flex:1,
            textAlign:'center',
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
          }}
          ><i class="fab fa-google"></i></Text>
          </TouchableOpacity>
        </a><br/>
        </View>
       
        <View style={styles.box}>
        <a style={
          {
            // flex:1,
            textDecorationLine:'none',
            //borderColor:'black',
            //borderWidth:2,
            backgroundColor:'transparent',
            fontSize: 35,
            fontWeight:'700',
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 2,
            // flex:1,
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
            textAlign:'center'
          }
        } href="/login/facebook">
          <TouchableOpacity style={styles.touch}>
    
          <Text id="linkLoginFacebook" 
          style={{
            // color:'black', 
            textDecorationLine:'none',
            color:'white',
            fontSize: 30,
            fontWeight:'700',
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 2,
            // flex:1,
            textAlign:'center',
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
          }}
          ><i class="fab fa-facebook"></i></Text>
          </TouchableOpacity>
        </a><br/>
        </View>
          </View>
        </Fade> 
        </Fade>
      </View>
      
      }   
      {/* </div>    */}
        {/* <AdSense.Google 
          client='NeM-xU1bQwBXyU8dz_MsINZX'
          slot='7806394673'
          style={{height:50,width:200,display:'block'}}
          layout='in-article'
          format='fluid'
        />   */}
          <Drawer 
            popLogin={overlayToggle}
          >
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
  const styles = StyleSheet.create({
  
    box:{
      margin:0,
      //padding:1,
      height:50,
      backgroundColor:'transparent',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row',
      // flex:1,
      //fontSize:12,
      //borderColor:'black',
      //borderRadius:2,
      //fontWeight:'700',
      //color:'black',
      // textShadowColor: 'rgba(1, 1, 1, 1)',
      // textShadowOffset: {width: 0, height: 0},
      // textShadowRadius: 20,
      //borderColor:'#cfcfcf',
      //borderWidth:1,
    },
    touch:{
      margin:0,
      //padding:1,
      //fontWeight:700,
      height:22,
      backgroundColor:'transparent',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row',
      // flex:1
    },
    link:{
      fontWeight:'700',
      color:'black', 
      textDecorationLine:'none',
      //borderColor:'black',
      //borderWidth:1 
    }
        
})
export default Home
