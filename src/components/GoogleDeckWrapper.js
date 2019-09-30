//import React, {memo} from 'react'
import React,{Component,useContext,useState,useEffect,memo} from 'react';
import GoogleDeck from './GoogleDeck'



// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const GoogleDeckWrapper = () => {
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
      <GoogleDeck style={{
        
      }}/>
    )

  }

export default GoogleDeckWrapper
