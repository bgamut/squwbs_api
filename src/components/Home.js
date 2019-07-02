//import React, {memo} from 'react'
import React,{Component,useContext,useState,useEffect,memo} from 'react';
import {Animated,PanResponder,Text,View,KeyboardAvoidingView,ScrollView,Dimensions} from 'react-native'
import HorizontalSwipeElements from './HorizontalSwipeElements'
import SwipeableList from './SwipeableList'
import SwipeableScroller from './SwipeableScroller'
import Swiper from './Swiper'
import AddPost from './AddPost'
import Header from './Header'
import Drawer from './Drawer'
const Home = () => (
  <div style={{
    alignItems:'center',
    borderColor:'#cfcfcf',
    borderRadius:2,
    borderWidth:1,
    flex:1,
    justifyContent:'space-evenly',
    margin:1,
    // shadowColor: 'rgba(1, 1, 1, 1)',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 20,
    //backgroundColor:'#ffffff',
    //height:22,
  }}>
  {/* <p style={{          
  
      height:22,
 
      flexDirection:'row',
      flex:1,
      fontSize:12,
 
      color:'black',
      // textShadowColor: 'black',
      // textShadowOffset: {width: 0, height: 0},
      // textShadowRadius: 20
    }}>
    Home
  </p> */}
    <View style={{height:Dimensions.get('window').height}}>  
      <Drawer>
        <SwipeableScroller/>
      </Drawer>
      <KeyboardAvoidingView style={{display:'absolute',bottom:0,flex:1,position:'absolute',height:Dimensions.get('window').height*5/30-30,backgroundColor:'transparent',flexDirection:'column',margin:0,width:Dimensions.get('window').width,padding:0}} behavior="padding" enabled >
          <View style={{backgroundColor:'transparent',height:30,felxDirection:'column',alignItems:'center',justifyContent:'center',marginRight:0,marginLeft:0,}}>
            <AddPost style={{marginTop:0,flex:1}}/>
          </View>

          <ScrollView horizontal = {true} style={{height:Dimensions.get('window').height/15,backgroundColor:'transparent',flexDirection:'row',marginLeft:0,marginRight:0}}>
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
              {/* <Text selectable={false} style={{           
                textDecorationLine:'none',
                color:'white',
                fontSize: 12,
                textShadowColor: 'rgba(128, 128, 128, 1)',
                textShadowOffset: {width: 0, height: 0},
                textShadowRadius: 8,
                flex:1,
                textAlign:'center',
                alignItems:'center',
                justifyContent:'center',
                flexDirection:'row',
              }}>one</Text> */}
            </View>
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
              {/* <Text selectable={false} style={{           
                textDecorationLine:'none',
                color:'white',
                fontSize: 12,
                textShadowColor: 'rgba(128, 128, 128, 1)',
                textShadowOffset: {width: 0, height: 0},
                textShadowRadius: 8,
                flex:1,
                textAlign:'center',
                alignItems:'center',
                justifyContent:'center',
                flexDirection:'row',
                
              }}>two</Text> */}
            </View>
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
              {/* <Text selectable={false} style={{           
                textDecorationLine:'none',
                color:'white',
                fontSize: 12,
                textShadowColor: 'rgba(128, 128, 128, 1)',
                textShadowOffset: {width: 0, height: 0},
                textShadowRadius: 8,
                flex:1,
                textAlign:'center',
                alignItems:'center',
                justifyContent:'center',
                flexDirection:'row',
              }}>three</Text> */}
            </View>
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
              {/* <Text selectable={false} style={{           
                textDecorationLine:'none',
                color:'white',
                fontSize: 12,
                textShadowColor: 'rgba(128, 128, 128, 1)',
                textShadowOffset: {width: 0, height: 0},
                textShadowRadius: 8,
                flex:1,
                textAlign:'center',
                alignItems:'center',
                justifyContent:'center',
                flexDirection:'row',
              }}>four</Text> */}
            </View>
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
              {/* <Text selectable={false} style={{           
                textDecorationLine:'none',
                color:'white',
                fontSize: 12,
                textShadowColor: 'rgba(128, 128, 128, 1)',
                textShadowOffset: {width: 0, height: 0},
                textShadowRadius: 8,
                flex:1,
                textAlign:'center',
                alignItems:'center',
                justifyContent:'center',
                flexDirection:'row',
              }}>one</Text> */}
            </View>
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
              {/* <Text selectable={false} style={{           
                textDecorationLine:'none',
                color:'white',
                fontSize: 12,
                textShadowColor: 'rgba(128, 128, 128, 1)',
                textShadowOffset: {width: 0, height: 0},
                textShadowRadius: 8,
                flex:1,
                textAlign:'center',
                alignItems:'center',
                justifyContent:'center',
                flexDirection:'row',
              }}>two</Text> */}
            </View>
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
              {/* <Text selectable={false} style={{           
                textDecorationLine:'none',
                color:'white',
                fontSize: 12,
                textShadowColor: 'rgba(128, 128, 128, 1)',
                textShadowOffset: {width: 0, height: 0},
                textShadowRadius: 8,
                flex:1,
                textAlign:'center',
                alignItems:'center',
                justifyContent:'center',
                flexDirection:'row',
              }}>three</Text> */}
            </View>
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
              {/* <Text selectable={false} style={{           
                textDecorationLine:'none',
                color:'white',
                fontSize: 12,
                textShadowColor: 'rgba(128, 128, 128, 1)',
                textShadowOffset: {width: 0, height: 0},
                textShadowRadius: 8,
                flex:1,
                textAlign:'center',
                alignItems:'center',
                justifyContent:'center',
                flexDirection:'row',
              }}>four</Text> */}
            </View>
          </ScrollView>
        
        </KeyboardAvoidingView> 
    </View> 
  </div>
)

export default Home
