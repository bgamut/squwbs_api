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
  <SafeAreaView>
    <View style={{
        flex:1,
        justifyContent: 'flex-end',
        marginBottom:0
    }}>
      <KeyboardAvoidingView             
        style={{
          height:22,
          backgroundColor:'#666666',
          alignItems:'center',
          justifyContent:'space-evenly',
          flexDirection:'row',
          flex:1,
          fontSize:12,
        }}
      >
        <View style={styles.box} >
          <a id="linkLogin" href="/login" style={{color:'white', textDecorationLine:'none',borderColor:'white',borderWidth:2 }}>login</a><br/>
        </View>
        <View style={styles.box}>
          <Link id="linkHome" to="/" style={{color:'white', textDecorationLine:'none',borderColor:'white',borderWidth:2}}>Home</Link><br/>
        </View>
        <View style={styles.box}>
          <Link id="linkTodo" to="/todo" style={{color:'white', textDecorationLine:'none',borderColor:'white',borderWidth:2}}>todo</Link><br/>
        </View>
        <View style={styles.box}>
          <Link id="linkMap" to="/map" style={{color:'white', textDecorationLine:'none',borderColor:'white',borderWidth:2}}>map</Link><br/>
        </View>
      
          
      </KeyboardAvoidingView>
    </View>
  </SafeAreaView>
)
const styles = StyleSheet.create({
  
    box:{
      height:22,
      backgroundColor:'#666666',
      alignItems:'center',
      justifyContent:'space-evenly',
      flexDirection:'row',
      flex:1,
      fontSize:12,
      borderColor:'white',
      borderRadius:2
    }
        
})
export default NavBar
