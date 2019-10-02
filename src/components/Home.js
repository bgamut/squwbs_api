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
  fetch(withQuery('https://squwbs-252702.appspot.com/user', {
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
  const [height,setHeight]=useState(0)
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
    const responded= await fetch('https://squwbs-252702.appspot.com/readCookies',{mode:'cors'})
    const userCookie = await responded.json()
    console.log('userCookie : '+stringifyObject(userCookie))
    if(Object.keys(userCookie).length>1){
      console.log('user info sent to server')
      fetch(withQuery('https://squwbs-252702.appspot.com/user', {
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
  const updateDimensions=()=>{
    setHeight(Math.floor(Dimensions.get('window').height))
    //style.height=Math.floor(Dimensions.get('window').height)
    //console.log('dimensions update')
    
  }
  useEffect(()=>{
    //getUserData()
    Dimensions.addEventListener('change',(e)=>{
      updateDimensions()
    })
    updateDimensions()
    var a = navigator.userAgent.toLowerCase()
    var isDesktop = !(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substring(0,4)));
    if(isDesktop=true){
      //document.location.href="https://bgamut.github.io/desktop/"
      //document.location.href="https://squwbs-252702.appspot.com/"
      console.log('this is a desktop environment')
    }
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

 
      <View style={{height:height}}>
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
              height:height,
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
            height:height,
            width:'100vw',
          }}
          when={fade}
          duration={duration}
          timeout={duration}
        >
          <View
          style={{
              
              height:height,
              width:'100vw',
              //opacity:0.4,
              //backgroundColor:'orange',
              backgroundColor:'rgba(0,0,0,0.8)',
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
              activeOpacity={1}
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
        } href="https://squwbs-252702.appspot.com/login/google">
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
          ><i class="fab fa-google"></i>
          </Text>
          <Text
            selectable={false} 
            style ={{
                fontSize: 25,
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
                margin:11,
                pointerEvents:'none'
            }}
          >
            Google
          </Text>
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
        } href="https://squwbs-252702.appspot.com/login/facebook">
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
          <Text
            selectable={false} 
            style ={{
                fontSize: 25,
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
                margin:11,
                pointerEvents:'none'
            }}
          >
            Facebook
          </Text>
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
