//import React, {memo} from 'react'
import React,{Component,useContext,useState,useEffect,memo} from 'react';
import {Animated,TouchableOpacity,TouchableHighlight,PanResponder,Text,View,KeyboardAvoidingView,ScrollView,Dimensions} from 'react-native'
import HorizontalSwipeElements from './HorizontalSwipeElements'
import SwipeableList from './SwipeableList'
import SwipeableScroller from './SwipeableScroller'
import MemorizationDeck from './MemorizationDeck'
import FileDrop from './FileDrop'
import {Context} from '../context'


// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const MemorizationDeckWrapper = () => {
  //run()
    //const [state,setState]=useState(Context)
    const getUserData=async()=>{
        // const responded= await fetch('https://squwbs.herokuapp.com/readCookies',{mode:'cors'})
        // const jsonObj = await responded.json()
        // console.log(JSON.stringify(jsonObj))

        //the words below shoeld be different for each user.
        //setState({...state,words:[{word:'random',meaning:'무작위의',example:'The lottery number was picked randomly.'},]})
        }
        useEffect(()=>{
        
        getUserData()
        //console.log(state.headerHeight)
        },[])
  
    const n =0
    return(
      <MemorizationDeck visible = {true} word={'random'} meaning={'무작위의'} example={'The lottery number was picked randomly.'} percentage={12}/>
    )

  }

export default MemorizationDeckWrapper
