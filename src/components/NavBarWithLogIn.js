import React,{useState,useRef,useEffect} from 'react'
import ReactDOM from 'react-dom'
//import { Link } from 'react-router-dom'
import { BrowserRouter,HashRouter, Route, Link,Router,Switch } from "react-router-dom";
import {ScrollView,Image} from 'react-native'
//import Navigator from './Navigator'
//import Catalogue from './screens/CatalogueScreen'
//import Category from './screens/CategoryScreen'
//import Product from './screens/ProductScreen'
//import A from 'react-native-a'
import {SafeAreaView,KeyboardAvoidingView,Text,View,StyleSheet,Dimensions,TouchableOpacity,Linking} from 'react-native'
//import Icon from 'react-native-vector-icons/FontAwesome'
//import {faFacebookSquare,faGoogle} from '@fortawesome/free-brands-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
//var facebookLogo = require('../svgs/brands/facebook-f.svg')
//var googleLogo = require('../svgs/brands/google.svg')
//import firebaseLogin from  './firebaseLogin'
const NavBarWithLogIn = (props) => {
  const [overlaySwitch,setOverlaySwitch]=useState(true)
  const overlay=useRef('')
  const overlayToggle=()=>{
    console.log(overlay.current.props.style.zIndex)
    if(overlay.current.props.style.zIndex==100){
        overlay.current.props.style.zIndex=1
        overlay.current.props.style.display='none'
        setOverlaySwitch(false)
        console.log('block to none')
    }
    else{
        overlay.current.props.style.zIndex=100
        overlay.current.props.style.display='block'
        setOverlaySwitch(true)
        console.log('none to block')
    }
    
  }
  // const loginAndCloseDrawer=(props)=>{
  //   props.popLogin
  //   props.ShowSlidingDrawer
  // }
  const toHash =(destination)=>{
    Linking.openURL('/#'+destination)
    props.ShowSlidingDrawer()
  }
  const loginOverlay = ()=>{
    return(
      <View
          ref={overlay}
          style={{
              position:'fixed',
              height:'100%',
              width:'100%',
              top:0,
              left:0,
              backgroundColor:'rgba(0,0,0,0.4)',
              justifyContent:'center',
              alignItems:'center',
              zIndex:100,
              //display:'block',
          }}
        >
          
          <View
          style={{
              
              height:'50vh',
              width:'50vw',
              //opacity:0.4,
              //backgroundColor:'orange',
              backgroundColor:'transparent',
              //backgroundImage:'',
              justifyContent:'center',
              alignItems:'center',
              textAlign:'center'
          }}>
              <TouchableOpacity
              style={{
                  position:'fixed',
                  height:25,
                  width:25,
                  top:15,
                  right:15,
                  //backgroundColor:'white',
                  zIndex:101
              }}
              onPress={
                  overlayToggle
              }
          >
              <Text
                  style={{
                      fontSize:16,
                      fontWeight:'700',
                      color:'white',
                      
                  }}
              >
                  X
              </Text>
          </TouchableOpacity>
              <Text>this is showing somewhere I think</Text>
          </View>
      </View>
    )
  } 
  useEffect(()=>{
    //console.log('overlaySwitch: true? ',overlaySwitch==true)
    // if(overlaySwitch==true){
    //   console.log('yo this is running')
    //   ReactDOM.render(
    //     <View
    //       //ref={overlay}
    //       style={{
    //           position:'fixed',
    //           height:'100%',
    //           width:'100%',
    //           top:0,
    //           left:0,
    //           backgroundColor:'rgba(0,0,0,0.4)',
    //           justifyContent:'center',
    //           alignItems:'center',
    //           zIndex:100,
    //           //display:'block',
    //       }}
    //     >
          
    //       <View
    //       style={{
              
    //           height:'50vh',
    //           width:'50vw',
    //           //opacity:0.4,
    //           //backgroundColor:'orange',
    //           backgroundColor:'transparent',
    //           //backgroundImage:'',
    //           justifyContent:'center',
    //           alignItems:'center',
    //           textAlign:'center'
    //       }}>
    //           <TouchableOpacity
    //           style={{
    //               position:'fixed',
    //               height:25,
    //               width:25,
    //               top:15,
    //               right:15,
    //               //backgroundColor:'white',
    //               zIndex:101
    //           }}
    //           onPress={
    //               overlayToggle
    //           }
    //       >
    //           <Text
    //               style={{
    //                   fontSize:16,
    //                   fontWeight:'700',
    //                   color:'white',
                      
    //               }}
    //           >
    //               X
    //           </Text>
    //       </TouchableOpacity>
    //           <Text>this is showing somewhere I think</Text>
    //       </View>
    //   </View>
    //     ,
    //     // this.overlay.current
    //     document.getElementById('homeOverlay')
    //   )
    // }
    // else{
      
    // }
    // console.log('overlaySwitch : ',overlaySwitch)
  },[overlaySwitch])
  
  // <SafeAreaView>
  //     <KeyboardAvoidingView             
  //     style={{
  //       height:22,
  //       //backgroundColor:'#666666',
  //       alignItems:'center',
  //       justifyContent:'space-evenly',
  //       flexDirection:'row',
  //       flex:1,
  //       fontSize:12,
  //       margin:1,
  //       borderColor:'#cfcfcf',
  //       borderWidth:0,
  //       // shadowColor: 'rgba(1, 1, 1, 1)',
  //       // shadowOffset: {width: 0, height: 0},
  //       // shadowRadius: 20,
  //       backgroundColor:'#ffffff'
  //     }}
  //   >
  //console.log(faFacebookSquare.icon)
  const popLogin=()=>{
    console.log('popLogin is triggered')
  }
    return(
      <View style={{
              //height:Dimensions.get('window').height/15,
              backgroundColor:'#666666',
              alignItems:'center',
              //justifyContent:'space-evenly',
              //flexDirection:'row',
              flexDirection:'column',
              //flex:1,
              // fontSize:12,
              margin:0,
              //borderColor:'#cfcfcf',
              //borderWidth:0,
              // shadowColor: 'rgba(1, 1, 1, 1)',
              // shadowOffset: {width: 0, height: 0},
              // shadowRadius: 20,
              backgroundColor:'transparent'
            }}>
            
            {/* <View
              ref={overlay}
              style={{
                width:'100%',
                height:'100%',
                backgroundColor:'orange'
              }}
            ></View> */}
        {/* {overlaySwitch && 
          <View
          ref={overlay}
          style={{
              position:'fixed',
              height:'100%',
              width:'100%',
              top:0,
              left:0,
              backgroundColor:'rgba(0,0,0,0.4)',
              justifyContent:'center',
              alignItems:'center',
              zIndex:100,
              //display:'block',
          }}
        >
          
          <View
          style={{
              
              height:'50vh',
              width:'50vw',
              //opacity:0.4,
              //backgroundColor:'orange',
              backgroundColor:'transparent',
              //backgroundImage:'',
              justifyContent:'center',
              alignItems:'center',
              textAlign:'center'
          }}>
              <TouchableOpacity
              style={{
                  position:'fixed',
                  height:25,
                  width:25,
                  top:15,
                  right:15,
                  //backgroundColor:'white',
                  zIndex:101
              }}
              onPress={
                  overlayToggle
              }
          >
              <Text
                  style={{
                      fontSize:16,
                      fontWeight:'700',
                      color:'white',
                      
                  }}
              >
                  X
              </Text>
          </TouchableOpacity>
              <Text>this is showing somewhere I think</Text>
          </View>
      </View>
      }       */}


{/* LOGIN ERROR NEED TO BE FIGURED OUT ON SERVER*/}


        {/* <View style={[styles.box,{
          // justifyContent:'top',
          alignItems:'top'
        }]}>
        
          <TouchableOpacity style={styles.touch}
            // onPress={popLogin}
            onPress={
              // function(){
              //   props.popLogin
              //   props.ShowSlidingDrawer
              // }
              props.loginAndCloseDrawer
            }
          >
          
            <Text
              style={{
                // color:'black', 
                textDecorationLine:'none',
                color:'white',
                fontSize: 17,
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
            >
              <i class="fa fa-user"></i>
            </Text>
          
          </TouchableOpacity>

        </View>  */}


        {/* <View style={styles.box}>
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
            fontSize: 17,
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
          >Google Login</Text>
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
            fontSize: 17,
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
            fontSize: 17,
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
          >Facebook Login</Text>
          </TouchableOpacity>
        </a><br/>
        </View> */}
         
         
        {/* <View style={styles.box}>
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
        } href="/#PDF">
          <TouchableOpacity style={styles.touch}>
       
          <Text id="PDF READER" 
          style={{
            // color:'black', 
            textDecorationLine:'none',
            color:'white',
            fontWeight:'700',
            fontSize: 17,
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 2,
            // flex:1,
            textAlign:'center',
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
          }}
          >PDF Reader</Text>
          </TouchableOpacity>
        </a><br/>
        </View> */}
        
        {/* <View style={styles.box}>
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
        } href="/#cards">
          <TouchableOpacity style={styles.touch}>

          <Text id="Word Cards" 
          style={{
            // color:'black', 
            textDecorationLine:'none',
            color:'white',
            fontWeight:'700',
            fontSize: 17,
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 2,
            // flex:1,
            textAlign:'center',
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
          }}
          >Word Cards</Text>
          </TouchableOpacity>
        </a><br/>
        </View> */}
        
        <View style={styles.box}>
        
        <TouchableOpacity 
          style={styles.touch}
          //onPress={props.ShowSlidingDrawer}
          //onPress={toHash('sound') }
        >
          
       <a style={{
        textDecorationLine:'none',
    margin:0,
    padding:0,
    backgroundColor:'transparent',
    fontSize: 17,
    fontWeight:'700',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 2,
    height:45,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    textAlign:'center'
      }} href="/#download">
        {/* <View
            style={{
              flexDirection:'row',
              height:45,
              width:250,
              backgroundColor:'transparent',
              //justifyContent:'center',
              alignItems:'center'
            }}
          > */}
          {/* <View
            style={{
              marginLeft:0,
              height:45,
              width:105,
              //justifyContent:'center',
              alignItems:'center',
              backgrondColor:'transparent',
              transform:[{
                translateX:18
            },{
                translateY:0
            }]
            }}
          > */}
            <Text
              style={{
                // color:'black', 
                textDecorationLine:'none',
                color:'white',
                fontSize: 17,
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
            >
              <i class="fa fa-credit-card"></i>
            </Text>
          {/* </View> */}
          {/* <View
            style={{
              height:45,
              width:100,
              backgroundColor:'transparent',
              alignItems:'center',
              //justifyContent:'center'
              transform:[{
                translateX:-6
            },{
                translateY:0
            }]
            }}
          >
        <Text id="download" 
        style={{

          textDecorationLine:'none',
          color:'white',
          fontWeight:'700',
          fontSize: 17,
          textShadowColor: 'rgba(0, 0, 0, 0.5)',
          textShadowOffset: {width: 0, height: 0},
          textShadowRadius: 2,

          textAlign:'center',
          alignItems:'center',
          justifyContent:'center',
          flexDirection:'row',
        }}
        >Download</Text>
        </View>
        </View> */}
        </a>
        </TouchableOpacity>
      
      </View>
{/* ......................................................................... */}
      <View style={styles.box}>
        
        <TouchableOpacity 
          style={styles.touch}
          //onPress={props.ShowSlidingDrawer}
          //onPress={toHash('sound') }
        >
       <a style={{
        textDecorationLine:'none',
    margin:0,
    padding:0,
    backgroundColor:'transparent',
    fontSize: 17,
    fontWeight:'700',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 2,
    height:45,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    textAlign:'center'
      }} href="/#sound">
        
          <Text
            style={{
              // color:'black', 
              textDecorationLine:'none',
              color:'white',
              fontSize: 17,
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
          >
            <i class="fa fa-music"></i>
            {/* <i class="fa fa-download" aria-hidden="true"></i>  */}
          </Text>
       
        </a>
        </TouchableOpacity>
      
      </View>
       
        {/* <View style={styles.box}>
        
        <TouchableOpacity 
          style={styles.touch}
          //onPress={props.ShowSlidingDrawer}
          //onPress={toHash('sound') }
        >
       <a style={{
        textDecorationLine:'none',
    margin:0,
    padding:0,
    backgroundColor:'transparent',
    fontSize: 17,
    fontWeight:'700',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 2,
    height:45,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    textAlign:'center'
      }} href="/#blog">
        
            <Text
              style={{
                // color:'black', 
                textDecorationLine:'none',
                color:'white',
                fontSize: 17,
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
            >
              <i class="fa fa-window-maximize"></i>
            </Text>
        
        </a>
        </TouchableOpacity>
      
      </View> */}
        
        {/* <View style={styles.box}>
        
        <TouchableOpacity 
          style={styles.touch}
          //onPress={props.ShowSlidingDrawer}
          //onPress={toHash('sound') }
        >
       <a style={{
        textDecorationLine:'none',
    margin:0,
    padding:0,
    backgroundColor:'transparent',
    fontSize: 17,
    fontWeight:'700',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 2,
    height:45,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    textAlign:'center'
      }} href="/#follow">
        
            <Text
              style={{
                textDecorationLine:'none',
                color:'white',
                fontSize: 17,
                fontWeight:'700',
                textShadowColor: 'rgba(0, 0, 0, 0.5)',
                textShadowOffset: {width: 0, height: 0},
                textShadowRadius: 2,
                textAlign:'center',
                alignItems:'center',
                justifyContent:'center',
                flexDirection:'row',
              }}
            >
              <i className="fab fa-instagram"></i>
            </Text>
          
        </a>
        </TouchableOpacity>
      
      </View> */}
        {/* <View style={styles.box}>
        
          <TouchableOpacity 
            style={styles.touch}
            //onPress={props.ShowSlidingDrawer}
            //onPress={toHash('sound') }
          >
         <a style={{
          textDecorationLine:'none',
      margin:0,
      padding:0,
      backgroundColor:'transparent',
      fontSize: 17,
      fontWeight:'700',
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: {width: 0, height: 0},
      textShadowRadius: 2,
      height:45,
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row',
      textAlign:'center'
        }} href="/#contact">
         
            <Text
              style={{
                // color:'black', 
                textDecorationLine:'none',
                color:'white',
                fontSize: 17,
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
            >
              <i class="fa fa-id-card"></i>
            </Text>
         
          </a>
          </TouchableOpacity>
        
        </View>
            */} 
      </View> 

  //   </KeyboardAvoidingView>
  // </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  
    box:{
      margin:0,
      padding:0,
      height:45,
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
      // borderColor:'#cfcfcf',
      // borderWidth:1,
    },
    link:{
      textDecorationLine:'none',
      margin:0,
      padding:0,
      backgroundColor:'transparent',
      fontSize: 17,
      fontWeight:'700',
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: {width: 0, height: 0},
      textShadowRadius: 2,
      height:45,
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row',
      textAlign:'center'
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
export default NavBarWithLogIn
