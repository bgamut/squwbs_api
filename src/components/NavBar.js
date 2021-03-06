import React from 'react'
//import { Link } from 'react-router-dom'
import { BrowserRouter,HashRouter, Route, Link,Router,Switch } from "react-router-dom";
import {ScrollView,Image} from 'react-native'
//import Navigator from './Navigator'
//import Catalogue from './screens/CatalogueScreen'
//import Category from './screens/CategoryScreen'
//import Product from './screens/ProductScreen'
import {SafeAreaView,KeyboardAvoidingView,Text,View,StyleSheet,Dimensions,TouchableOpacity} from 'react-native'
//import Icon from 'react-native-vector-icons/FontAwesome'
//import {faFacebookSquare,faGoogle} from '@fortawesome/free-brands-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
//var facebookLogo = require('../svgs/brands/facebook-f.svg')
//var googleLogo = require('../svgs/brands/google.svg')
import FirebaseLogout from './FirebaseLogout'
const NavBar = (props) => {
  
    return(
      <View style={{
              backgroundColor:'#666666',
              alignItems:'center',
              flexDirection:'column',
              margin:0,
              backgroundColor:'transparent'
            }}>
        
       
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
        
        {/* <View style={styles.box}
        
        >
        <a style={
          {
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
          }
        } href="/#sound">
          <TouchableOpacity 
            onPress={props.ShowSlidingDrawer}
            style={styles.touch}
          >
         
          <Text id="Sound" 
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
          >Sound</Text>
          </TouchableOpacity>
        </a>
        </View>
        
        <View style={styles.box}>
        <a style={
          {
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
          }
        } href="/#follow">
          <TouchableOpacity 
            onPress={props.ShowSlidingDrawer}
            style={styles.touch}
          >
         
          <Text id="instagram" 
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
          >Follow</Text>
          </TouchableOpacity>
        </a>
        </View>
          
        
        <View style={styles.box}>
        <a style={
          {
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
          }
        } href="/#contact">
          <TouchableOpacity 
            onPress={props.ShowSlidingDrawer}
            style={styles.touch}
          >
         
          <Text id="Contact" 
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
          >Contact</Text>
          </TouchableOpacity>
        </a>
        </View> */}
      
        {/* <View style={styles.box}>
        <a style={
          {
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
          }
        } href="/logout">
          <TouchableOpacity 
            onPress={props.ShowSlidingDrawer}
            style={styles.touch}
          >
         
          <Text id="Contact" 
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
          >Log Out</Text>
          </TouchableOpacity>
        </a>
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
      }} href="/#testDownloadLink">
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
              <i class="fa fa-download"></i>
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
            </Text>
          
          </a>
          </TouchableOpacity>
        
        </View>
       
       
       

        <View style={[styles.box,{
          // justifyContent:'top',
          alignItems:'top'
        }]}>
          <FirebaseLogout/>
        </View>
        {/* <View style={styles.box}>
        <a style={
          {
            textDecorationLine:'none',
  
            backgroundColor:'transparent',
            fontSize: 17,
            fontWeight:'700',
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 2,

            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
            textAlign:'center'
          }
        } href="/removeme">
          <TouchableOpacity style={styles.touch}>
         
          <Text id="Contact" 
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
          >Remove Profile</Text>
          </TouchableOpacity>
        </a><br/>
        </View> */}
      </View>

  //   </KeyboardAvoidingView>
  // </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  
    box:{
      margin:0,
      //padding:1,
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
export default NavBar

