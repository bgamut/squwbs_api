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
    flex:1,
    margin:1,
    borderColor:'#cfcfcf',
    borderWidth:1,
    borderRadius:2,
    // shadowColor: 'rgba(1, 1, 1, 1)',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 20,
    //backgroundColor:'#ffffff',
    alignItems:'center',
    justifyContent:'space-evenly',
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
     <View>  
      {/* <Header/>        */}
      <Drawer>
      <SwipeableScroller>
        {/* <View style={{backgroundColor:'transparent',flex:1,height:Dimensions.get('window').height*2/3,flexDirection:'column',margin:5,paddingRight:2,paddingLeft:2}}>

          <View  style={{height:Dimensions.get('window').height/6,backgroundColor:'transparent'}}>

            <Swiper buttonsEnabled={false} loop={true} autoplayTimeout={5}>
  
              <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgb(20,20,20)"
                }}>
                  <Text>Slide 1</Text>
              </View>
              <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgb(110,110,110)"
              }}>
                  <Text>Slide 2</Text>
              </View>
              <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgb(200,200,200)"
              }}>
                  <Text>Slide 3</Text>
              </View>
            </Swiper>
          </View>

          </View>
          <View>
            <SwipeableList/>
          </View> */}
        </SwipeableScroller>
        <KeyboardAvoidingView style={{height:Dimensions.get('window').height*5/30-30,backgroundColor:'transparent',flexDirection:'column',margin:5}} behavior="padding" enabled>
          <View style={{backgroundColor:'transparent',height:30,felxDirection:'column',alignItems:'center',justifyContent:'center',marginRight:10,marginLeft:10}}>
            <AddPost style={{marginTop:0}}/>
          </View>

          <ScrollView horizontal = {true} style={{height:Dimensions.get('window').height/15,backgroundColor:'transparent',flexDirection:'row',marginLeft:0,marginRight:0}}>
            <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'white',flex:1,flexDirection:'column',marginRight:2,marginLeft:3}}>
              <Text selectable={false}>one</Text>
            </View>
            <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'lightgrey',flex:1,flexDirection:'column',marginRight:2,marginLeft:2}}>
              <Text selectable={false}>two</Text>
            </View>
            <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'darkgrey',flex:1,flexDirection:'column',marginRight:2,marginLeft:2}}>
              <Text selectable={false}>three</Text>
            </View>
            <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'black',flex:1,flexDirection:'column',marginRight:2,marginLeft:2}}>
              <Text selectable={false}>four</Text>
            </View>
            <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'white', flex:1,flexDirection:'column',marginRight:2,marginLeft:2}}>
              <Text selectable={false}>one</Text>
            </View>
            <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'lightgrey',flex:1,flexDirection:'column',marginRight:2,marginLeft:2}}>
              <Text selectable={false}>two</Text>
            </View>
            <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'darkgrey',flex:1,flexDirection:'column',marginRight:2,marginLeft:2}}>
              <Text selectable={false}>three</Text>
            </View>
            <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'black',flex:1,flexDirection:'column',marginRight:2,marginLeft:2}}>
              <Text selectable={false}>four</Text>
            </View>
          </ScrollView>
        
        </KeyboardAvoidingView>
        </Drawer>
      </View> 
  </div>
)

export default Home
