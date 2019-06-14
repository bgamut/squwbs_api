import React from 'react'
//import { Link } from 'react-router-dom'
import { BrowserRouter,HashRouter, Route, Link,Router,Switch } from "react-router-dom";
import {ScrollView} from 'react-native'
import Navigator from './Navigator'
import Catalogue from './screens/CatalogueScreen'
import Category from './screens/CategoryScreen'
import Product from './screens/ProductScreen'
import {SafeAreaView,KeyboardAvoidingView,View,StyleSheet} from 'react-native'
const NavBar = () => (
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
      <View style={{
              height:22,
              //backgroundColor:'#666666',
              alignItems:'center',
              justifyContent:'space-evenly',
              flexDirection:'row',
              flex:1,
              fontSize:12,
              margin:1,
              borderColor:'#cfcfcf',
              borderWidth:0,
              // shadowColor: 'rgba(1, 1, 1, 1)',
              // shadowOffset: {width: 0, height: 0},
              // shadowRadius: 20,
              backgroundColor:'#ffffff'
            }}>
   
        <View style={styles.box} >
          <a id="linkLogin" href="/login" style={{color:'black', textDecorationLine:'none',borderColor:'black',borderWidth:2 }}>Login</a><br/>
        </View>
        <View style={styles.box}>
          <Link id="linkHome" to="/" style={{color:'black', textDecorationLine:'none',borderColor:'black',borderWidth:2}}>Home</Link><br/>
        </View>
        <View style={styles.box}>
          <Link id="linkTodo" to="/todo" style={{color:'black', textDecorationLine:'none',borderColor:'black',borderWidth:2}}>Todo</Link><br/>
        </View>
        <View style={styles.box}>
          <Link id="linkMap" to="/map" style={{color:'black', textDecorationLine:'none',borderColor:'black',borderWidth:2}}>Map</Link><br/>
        </View>
      
          
      
      </View>
  //   </KeyboardAvoidingView>
  // </SafeAreaView>
)
const styles = StyleSheet.create({
  
    box:{
      margin:0,
      //padding:1,
      height:22,
      backgroundColor:'#ffffff',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row',
      flex:1,
      fontSize:12,
      borderColor:'black',
      borderRadius:2,
      color:'black',
      fontSize:12,
      // textShadowColor: 'rgba(1, 1, 1, 1)',
      // textShadowOffset: {width: 0, height: 0},
      // textShadowRadius: 20,
      borderColor:'#cfcfcf',
      borderWidth:1,
    },
    link:{
      color:'black', 
      textDecorationLine:'none',
      borderColor:'black',
      borderWidth:1 
    }
        
})
export default NavBar
