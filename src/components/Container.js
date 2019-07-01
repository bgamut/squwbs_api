import React,{Component,useContext,useState,useEffect,memo} from 'react';
import {Animated,PanResponder,Text,View,KeyboardAvoidingView,ScrollView,Dimensions} from 'react-native'
import {Context} from '../context'
const Container =(props)=>{
    const [state, setState] = useContext(Context)
    const handleRefresh =(e)=>{
        //console.log(e)
        console.log(window.innerWidth+":"+window.innerHeight)
        var windowDimensions={
            width:window.innerWidth,
            height:window.innerHeight
        }
        setState({...state,windowDimensions:{height:windowDimensions.height,width:windowDimensions.width}})
    }
    useEffect(()=>{
        window.addEventListener('resize',handleRefresh)
        window.addEventListener('orientationchange',handleRefresh)
        return()=>{
            window.removeEventListener('resize',handleRefresh)
            window.reamoveEventlistner('orientationchange',handleRefresh)
        }
    }, [])
    
    return(
        <View>{props.children}</View>
    )  
}
export default Container